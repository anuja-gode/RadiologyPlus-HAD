package com.example.security.services.radiologist;

import com.example.security.DTOs.AnnotatedImagesDTO;
import com.example.security.DTOs.Requests.AnnotatedImageRequest;
import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.AnnotatedImages;
import com.example.security.Model.Case;
import com.example.security.Repositories.AnnotatedImagesRepo;
import com.example.security.Repositories.CaseRepo;
import com.example.security.Repositories.DoctorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class AnnotatedImageService {
    @Autowired
    private AnnotatedImagesRepo annotatedImagesRepo;
    @Autowired
    private CaseRepo caseRepo;
    @Autowired
    private DoctorRepo doctorRepo;

    public ResponseEntity<String> uploadAnnotations(AnnotatedImageRequest request,String email){
        Optional<Case> caseOptional=caseRepo.findById(request.getCaseId());
        Optional<Doctor> doctor=doctorRepo.findByUserEmail(email);
        Doctor doc1=doctor.get();
        if(caseOptional.isPresent()) {
            Case caseObj=caseOptional.get();
            AnnotatedImages annotatedImages = AnnotatedImages.builder().annotatorId(doc1.getDoctorId()).
                    cases(caseObj).finalRemarks(request.getFinalRemarks()).
                    annotatedImageBase64(request.getAnnotatedImageBase64()).
                    build();

            annotatedImagesRepo.save(annotatedImages);
            return ResponseEntity.ok("Annotated Images added successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Case not found");

    }

   public List<AnnotatedImagesDTO> getListOfAnnotatedImagesDTOByCaseId(Long caseId) {
       List<AnnotatedImages> annotatedImagesList = annotatedImagesRepo.findAllByCaseId(caseId);
       return annotatedImagesList.stream()
               .map(this::convertToDTO)
               .collect(Collectors.toList());
   }

    private AnnotatedImagesDTO convertToDTO(AnnotatedImages annotatedImages) {
        return AnnotatedImagesDTO.builder()
                .annotatedImageBase64(annotatedImages.getAnnotatedImageBase64())
                .annotatorId(annotatedImages.getAnnotatorId())
                .finalRemarks(annotatedImages.getFinalRemarks())
                .build();
    }




}
