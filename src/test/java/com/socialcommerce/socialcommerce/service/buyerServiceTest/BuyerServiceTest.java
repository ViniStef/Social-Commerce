package com.socialcommerce.socialcommerce.service.buyerServiceTest;


import com.socialcommerce.socialcommerce.dto.BuyerProfileDto;
import com.socialcommerce.socialcommerce.dto.CreateBuyerDto;
import com.socialcommerce.socialcommerce.dto.ImagePathDto;
import com.socialcommerce.socialcommerce.exception.NotFoundException;
import com.socialcommerce.socialcommerce.exception.PasswordNotMatchException;
import com.socialcommerce.socialcommerce.model.Buyer;
import com.socialcommerce.socialcommerce.model.Publication;
import com.socialcommerce.socialcommerce.model.Seller;
import com.socialcommerce.socialcommerce.repository.IBuyerRepo;
import com.socialcommerce.socialcommerce.repository.ISellerRepo;
import com.socialcommerce.socialcommerce.service.buyerService.BuyerService;
import com.socialcommerce.socialcommerce.utils.BuyerUtils;
import com.socialcommerce.socialcommerce.utils.SellerUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BuyerServiceTest {

    @Mock
    IBuyerRepo buyerRepo;

    @Mock
    ISellerRepo sellerRepo;

    @InjectMocks
    BuyerService service;

    @Captor
    private ArgumentCaptor<Buyer> buyerCaptor; // Captor para Buyer

    @Captor
    private ArgumentCaptor<Seller> sellerCaptor;

    @BeforeEach
    void setup(){
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldBeAbleToCreateValidBuyer() {
        // Arrange
        Buyer aValidBuyer = BuyerUtils.createAValidBuyer();
        CreateBuyerDto buyerDto = BuyerUtils.createBuyerDto();

        when(buyerRepo.save(any(Buyer.class))).thenReturn(aValidBuyer);

        // Act
        service.createBuyer(buyerDto);

        // Assert
        verify(buyerRepo).save(any(Buyer.class));
        Assertions.assertEquals(buyerDto.first_name(), aValidBuyer.getFirstName());
        Assertions.assertEquals(buyerDto.last_name(), aValidBuyer.getLastName());
        Assertions.assertEquals(buyerDto.password(), aValidBuyer.getPassword());
    }

    @Test
    void shouldBeThrowErrorWhenCreateInvalidBuyer(){

        CreateBuyerDto buyerDto = BuyerUtils.createInvalidBuyerDto();

        PasswordNotMatchException passwordNotMatchException = Assertions.assertThrows(PasswordNotMatchException.class, () -> {
            service.createBuyer(buyerDto);
        });

        Assertions.assertEquals("Password not match", passwordNotMatchException.getMessage());
    }

    @Test
    void shouldAssociateBuyerToSellerSuccessfully() {

        Seller aValidSeller = SellerUtils.createAValidSeller();
        Buyer aValidBuyer = BuyerUtils.createAValidBuyer();

        aValidSeller.setBuyers(new ArrayList<>());
        aValidBuyer.setSellers(new ArrayList<>());

        when(sellerRepo.findById(1L)).thenReturn(Optional.of(aValidSeller));
        when(buyerRepo.findById(1L)).thenReturn(Optional.of(aValidBuyer));

        service.followerASeller(1L, 1L);

        verify(buyerRepo).save(buyerCaptor.capture());
        verify(sellerRepo).save(sellerCaptor.capture());

        Buyer savedBuyer = buyerCaptor.getValue();
        Seller savedSeller = sellerCaptor.getValue();

        Assertions.assertTrue(savedBuyer.getSellers().contains(aValidSeller));
        Assertions.assertTrue(savedSeller.getBuyers().contains(aValidBuyer));
    }


    @Test
    void shouldThrowExceptionWhenSellerNotFound() {
        when(sellerRepo.findById(1L)).thenReturn(Optional.empty());

        NotFoundException exception = Assertions.assertThrows(NotFoundException.class, () -> {
            service.followerASeller(1L, 1L);
        });

        Assertions.assertEquals("Seller not found", exception.getMessage());
        verifyNoInteractions(buyerRepo);
    }

    @Test
    void shouldThrowExceptionWhenBuyerNotFound() {
        when(sellerRepo.findById(1L)).thenReturn(Optional.of(SellerUtils.createAValidSeller()));
        when(buyerRepo.findById(1L)).thenReturn(Optional.empty());

        NotFoundException exception = Assertions.assertThrows(NotFoundException.class, () -> {
            service.followerASeller(1L, 1L);
        });

        Assertions.assertEquals("Buyer not found", exception.getMessage());
    }

    @Test
    void shouldBeAbleToGetABuyerProfile(){
        Buyer aValidBuyer = BuyerUtils.createAValidBuyer();
        aValidBuyer.setSellers(new ArrayList<>());

        when(buyerRepo.findById(anyLong())).thenReturn(Optional.of(aValidBuyer));

        BuyerProfileDto buyerProfileDto = service.buyerProfile(anyLong());

        Assertions.assertEquals("Marcos", buyerProfileDto.firstName());
        Assertions.assertEquals("Goulart", buyerProfileDto.lastName());
        Assertions.assertNotNull(buyerProfileDto.sellers());

    }

    @Test
    void shouldBeThrowAErrorWhenNotFoundBuyerWhenGetABuyerProfile(){


        when(buyerRepo.findById(anyLong())).thenReturn(Optional.empty());

        NotFoundException exception = Assertions.assertThrows(NotFoundException.class, () -> {
            service.buyerProfile(anyLong());
        });

        Assertions.assertEquals("Buyer Not Found", exception.getMessage());

    }


    @Test
    void shouldIncrementLikesWhenPublicationIsFound() {

        Seller aValidSeller = SellerUtils.createAValidSeller();

        aValidSeller.setPublications(new ArrayList<>());

        Publication publication = new Publication();
        publication.setPublication_id(1L);
        publication.setLikes(10);
        aValidSeller.getPublications().add(publication);

        when(sellerRepo.findById(1L)).thenReturn(Optional.of(aValidSeller));

        service.likeAPublication(1L, 1L);

        Assertions.assertEquals(11, publication.getLikes());
    }

    @Test
    void shouldThrowNotFoundExceptionWhenSellerDoesNotExist() {
        when(sellerRepo.findById(1L)).thenReturn(Optional.empty());


        NotFoundException exception = Assertions.assertThrows(NotFoundException.class, () -> {
            service.likeAPublication(1L, 1L);
        });

        Assertions.assertEquals("Seller not Found", exception.getMessage());
    }

    @Test
    void shouldThrowNotFoundExceptionWhenPublicationIsNotFound() {
        // Arrange: Configurando Seller e publicações, mas a publicação não existe
        Seller aValidSeller = SellerUtils.createAValidSeller();
        aValidSeller.setPublications(new ArrayList<>());

        when(sellerRepo.findById(1L)).thenReturn(Optional.of(aValidSeller));

        NotFoundException exception = Assertions.assertThrows(NotFoundException.class, () -> {
            service.likeAPublication(1L, 1L);
        });

        Assertions.assertEquals("Publication not found", exception.getMessage());
    }

    @Test
    void shouldBeAbleUnfollowASeller(){
        Seller aValidSeller = SellerUtils.createAValidSeller();
        Buyer aValidBuyer = BuyerUtils.createAValidBuyer();
        aValidSeller.setSellerId(1L);
        aValidBuyer.setBuyerId(1L);

        aValidBuyer.setSellers(new ArrayList<>(){{
            add(aValidSeller);
        }});

        when(buyerRepo.findById(anyLong())).thenReturn(Optional.of(aValidBuyer));

        service.deleteFollower(1L, 1L);

        Assertions.assertTrue(aValidBuyer.getSellers().isEmpty());
    }

    @Test
    void shouldBeToThrowAErrorWhenUnfollowASeller(){


        when(buyerRepo.findById(anyLong())).thenReturn(Optional.empty());

        NotFoundException exception = Assertions.assertThrows(NotFoundException.class, () -> {
            service.deleteFollower(1L, 1L);
        });

        Assertions.assertEquals("Buyer not Found", exception.getMessage());
    }

    @Test
    void shouldBeAbleToUploadAImage(){
        Buyer aValidBuyer = BuyerUtils.createAValidBuyer();
        aValidBuyer.setBuyerId(1L);

        when(buyerRepo.findById(anyLong())).thenReturn(Optional.of(aValidBuyer));

        service.uploadImage(1L, new ImagePathDto("path"));

        Assertions.assertEquals("path", aValidBuyer.getImagePath());
    }




    @Test
    void shouldBeToThrowAErrorWhenUploadAImageButNotFoundBuyer(){


        when(buyerRepo.findById(anyLong())).thenReturn(Optional.empty());

        NotFoundException exception = Assertions.assertThrows(NotFoundException.class, () -> {
            service.deleteFollower(1L, 1L);
        });

        Assertions.assertEquals("Buyer not Found", exception.getMessage());
    }





}
