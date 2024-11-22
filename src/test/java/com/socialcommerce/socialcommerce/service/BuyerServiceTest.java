package com.socialcommerce.socialcommerce.service;


import com.socialcommerce.socialcommerce.repository.IBuyerRepo;
import com.socialcommerce.socialcommerce.service.buyerService.BuyerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class BuyerServiceTest {

    @Mock
    IBuyerRepo buyerRepo;

    @InjectMocks
    BuyerService service;

    @BeforeEach
    void setup(){
        MockitoAnnotations.openMocks(this);
    }



}
