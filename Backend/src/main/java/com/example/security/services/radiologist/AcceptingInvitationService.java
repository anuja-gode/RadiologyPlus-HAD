package com.example.security.services.radiologist;

import com.example.security.DTOs.Requests.AcceptInvRequest;
import com.example.security.Model.AccessTable;
import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Actors.Patient;
import com.example.security.Model.Actors.User;
import com.example.security.Model.Case;
import com.example.security.Model.Invitation;
import com.example.security.Model.Notification;
import com.example.security.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AcceptingInvitationService {
    @Autowired
    private DoctorRepo doctorRepo;
    @Autowired
    private CaseRepo caseRepo;
    @Autowired
    private InvitationRepo invitationRepo;
    @Autowired
    private AccessTableRepo accessTableRepo;
    @Autowired
    private UserRepo userRepo ;
    @Autowired
    private NotificationRepo notificationRepo;

    public void acceptInvitation(AcceptInvRequest acceptInvRequest) {
        // Find the Doctor from the database using the provided email
        Optional<User> userOptional = userRepo.findByEmail(acceptInvRequest.getEmail());
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found for email: " + acceptInvRequest.getEmail());
        }

        // Get the user ID
        UUID userId = userOptional.get().getUserId();

        // Find doctor based on the user ID
        Optional<Doctor> doctorOptional = doctorRepo.findByUserUserId(userId);
        if (doctorOptional.isEmpty()) {
            throw new IllegalArgumentException("Doctor not found for email: " + acceptInvRequest.getEmail());
        }
        Doctor doctor = doctorOptional.get();

        // Find the Case from the database using the provided caseId
        Optional<Case> caseOptional = caseRepo.findById(Long.valueOf(acceptInvRequest.getCaseId()));
        if (caseOptional.isEmpty()) {
            throw new IllegalArgumentException("Case not found for caseId: " + acceptInvRequest.getCaseId());
        }
        Case caseEntity = caseOptional.get();

        // Find the Invitation by caseId
        Optional<Invitation> invitationOptional = invitationRepo.findById(Long.valueOf(acceptInvRequest.getCaseId()));
        if (invitationOptional.isEmpty()) {
            throw new IllegalArgumentException("Invitation not found for caseId: " + acceptInvRequest.getCaseId());
        }
        Invitation invitation = invitationOptional.get();

        // If the invitation status is "Accepted", proceed with updating the invitation and creating access table entry
        if (acceptInvRequest.getChoice().equals("Accepted")) {
            // Update the Invitation's status to "Accepted"
            invitation.setInvitationStatus("Accepted");
            invitation.setTimestampAccepted(new Date());
            invitation.setDoctor(doctor);

            // Save the updated Invitation
            invitationRepo.save(invitation);

            // Initialize consentedUserIds list if it is null
            List<Long> consentedUserIds = caseEntity.getConsentedUserIds();
            if (consentedUserIds == null) {
                consentedUserIds = new ArrayList<>();
            }

            // Check if doctorId already exists in consentedUserIds list
            if (!consentedUserIds.contains(doctor.getDoctorId())) {
                // Add the doctorId to consentedUserIds list of the Case if not already present
                consentedUserIds.add(doctor.getDoctorId());
                caseEntity.setConsentedUserIds(consentedUserIds);
            }

            // Create a new AccessTable entry
            AccessTable accessTableEntry = new AccessTable();
            accessTableEntry.setDoctor(doctor);
            accessTableEntry.setCases(caseEntity);
            accessTableEntry.setTimestampAccepted(new Date());

            // Save the AccessTable entry
            accessTableEntry = accessTableRepo.save(accessTableEntry);

            // Check if the access table entry is successfully saved
            if (accessTableEntry != null) {
                // AccessTable entry saved successfully, proceed with updating the notification table
                updateNotificationTable(caseEntity, doctor);
            } else {
                // Handle the case where the access table entry could not be saved
                throw new RuntimeException("Failed to save AccessTable entry.");
            }
        } else if (acceptInvRequest.getChoice().equals("Rejected")) {
            // If the invitation status is not "Accepted", update it to "Rejected"
            invitation.setInvitationStatus("Rejected");
            invitation.setTimestampAccepted(new Date());

            // Save the updated Invitation
            invitationRepo.save(invitation);

            // Handle the case where invitation status is not "Accepted"
            throw new RuntimeException("Invitation status is not 'Accepted', cannot proceed.");
        }
    }
    private void updateNotificationTable(Case caseEntity, Doctor doctor) {
        // Retrieve patient from the caseEntity
        Patient patient = caseEntity.getPatient();

        // Create two notification entries: one for the patient and one for the doctor
        createNotificationEntry(patient, "The radiologist you selected has accepted your invitation.", "p");
        createNotificationEntry(doctor, "The patient selected a radiologist.", "d");
    }

    private void createNotificationEntry(Object receiver, String messageText, String receiverType) {
        if (!(receiver instanceof Doctor) && !(receiver instanceof Patient)) {
            throw new IllegalArgumentException("Receiver must be an instance of Doctor or Patient.");
        }

        Notification notification = new Notification();
        notification.setMessageText(messageText);
        notification.setNotification_Status("Pending"); // Corrected method name
        notification.setTimestamp(new Date()); // Corrected method name
        notification.setReceiverType(receiverType.charAt(0)); // Assuming 'p' or 'd' for patient or doctor

        if ("d".equals(receiverType) && receiver instanceof Doctor) {
            notification.setDoctor((Doctor) receiver);
        } else if ("p".equals(receiverType) && receiver instanceof Patient) {
            notification.setPatient((Patient) receiver);
        } else {
            throw new IllegalArgumentException("Invalid receiver type: " + receiverType);
        }

        notificationRepo.save(notification);
    }
}