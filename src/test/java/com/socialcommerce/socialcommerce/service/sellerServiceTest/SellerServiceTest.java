package com.socialcommerce.socialcommerce.service.sellerServiceTest;


import com.socialcommerce.socialcommerce.dto.*;
import com.socialcommerce.socialcommerce.exception.NotFoundException;
import com.socialcommerce.socialcommerce.exception.PasswordNotMatchException;
import com.socialcommerce.socialcommerce.model.Buyer;
import com.socialcommerce.socialcommerce.model.Publication;
import com.socialcommerce.socialcommerce.model.Seller;
import com.socialcommerce.socialcommerce.repository.ISellerRepo;
import com.socialcommerce.socialcommerce.service.sellerService.SellerService;
import com.socialcommerce.socialcommerce.utils.SellerUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SellerServiceTest {

    @Mock
    ISellerRepo repo;

    @InjectMocks
    SellerService sellerService;

    @BeforeEach
    void setup(){
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldBeAbleToCreateValidSeller() {
        // Arrange
        Seller aValidSeller = SellerUtils.createAValidSeller();
        CreateSellerDto sellerDto = SellerUtils.createSellerDto();

        when(repo.save(any(Seller.class))).thenReturn(aValidSeller);

        // Act
        sellerService.createSeller(sellerDto);

        // Assert
        verify(repo).save(any(Seller.class));
        assertEquals(sellerDto.first_name(), aValidSeller.getFirstName());
        assertEquals(sellerDto.last_name(), aValidSeller.getLastName());
        assertEquals(sellerDto.password(), aValidSeller.getPassword());
    }

    @Test
    void shouldBeThrowAErrorWhenCreateInvalidSeller(){
        // Arrange
        CreateSellerDto sellerDto = SellerUtils.createInvalidSellerDto();
        // Act
        PasswordNotMatchException exception = Assertions.assertThrows(PasswordNotMatchException.class, () -> {
            sellerService.createSeller(sellerDto);
        });

        // Assert
        assertEquals("Password not match", exception.getMessage());
    }

    @Test
    void shouldBeAbleToGetABuyerProfile(){
        Seller aValidSeller = SellerUtils.createAValidSeller();
        aValidSeller.setBuyers(new ArrayList<>());

        when(repo.findById(anyLong())).thenReturn(Optional.of(aValidSeller));

        SellerProfileDto sellerProfileDto = sellerService.sellerProfile(anyLong());

        assertEquals(aValidSeller.getFirstName(), sellerProfileDto.firstName());
        assertEquals(aValidSeller.getLastName(), sellerProfileDto.lastName());
        assertTrue(sellerProfileDto.buyers().isEmpty());
    }

    @Test
    void shouldBeThrowAErrorWhenGetABuyerProfile(){
        when(repo.findById(1L)).thenReturn(Optional.empty());

        NotFoundException exception = Assertions.assertThrows(NotFoundException.class, () -> {
            sellerService.sellerProfile(1L);
        });

        assertEquals("Seller not found", exception.getMessage());
    }

    @Test
    void shouldBeAbleToGetAllSellersByName(){
        Seller aValidSeller1 = SellerUtils.createAValidSeller();
        Seller aValidSeller2 = SellerUtils.createAValidSeller();

        when(repo.findAllByFirstNameContainingIgnoreCase("Marcos")).thenReturn(List.of(aValidSeller1, aValidSeller2));

        List<SellerForBuyerProfileDto> listOfSellers = sellerService.getAllByName("Marcos");

        assertEquals("Marcos", listOfSellers.get(0).firstName());
        assertEquals("Vinicius", listOfSellers.get(1).lastName());
        assertEquals(2, listOfSellers.size());

    }

    @Test
    void shouldBeThrowWhenGetAllSellersName(){

        when(repo.findAllByFirstNameContainingIgnoreCase("Marcos")).thenReturn(null);

        NotFoundException exception = Assertions.assertThrows(NotFoundException.class, () -> {
            sellerService.getAllByName("Marcos");
        });

        assertEquals("Seller not found", exception.getMessage());
    }

    @Test
    void shouldBeAbleToUploadASellerImage(){
        Seller aValidSeller = SellerUtils.createAValidSeller();
        aValidSeller.setSellerId(1L);
        aValidSeller.setImagePath("path");

        when(repo.findById(1L)).thenReturn(Optional.of(aValidSeller));

        when(repo.save(any(Seller.class))).thenReturn(aValidSeller);

        sellerService.uploadImage(1L, new ImagePathDto("path"));

        verify(repo).save(any(Seller.class));

    }

    @Test
    void shouldBeThrowErrorWhenUploadImage(){

        when(repo.findById(1L)).thenReturn(Optional.empty());

        NotFoundException exception = Assertions.assertThrows(NotFoundException.class, () -> {
            sellerService.uploadImage(1L, new ImagePathDto("path"));
        });

        assertEquals("Seller not found", exception.getMessage());
    }

    @Test
    void shouldBeAbleToGetSellerMetrics(){
        Seller aValidSeller = SellerUtils.createAValidSeller();
        Publication publication = new Publication();
        publication.setLikes(20);
        aValidSeller.setSellerId(1L);
        aValidSeller.setPublications(new ArrayList<>(){{
            add(publication);
        }});
        aValidSeller.setBuyers(new ArrayList<>(){{
            add(new Buyer());
        }});


        when(repo.findById(1L)).thenReturn(Optional.of(aValidSeller));

        SellerMetrics sellerMetrics = sellerService.getSellerMetrics(1L);

        assertEquals(20, sellerMetrics.numOfLikes());
        assertEquals(1, sellerMetrics.numOfPublications());
        assertEquals(1, sellerMetrics.numOfFollowers());
    }

    @Test
    void shouldBeThrowErrorWhenGetSellerMetrics(){
        when(repo.findById(1L)).thenReturn(Optional.empty());

        NotFoundException exception = Assertions.assertThrows(NotFoundException.class, () -> {
            sellerService.getSellerMetrics(1L);
        });

        assertEquals("Seller not found", exception.getMessage());

    }

}
