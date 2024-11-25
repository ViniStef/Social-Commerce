package com.socialcommerce.socialcommerce.service.publicationServiceTest;

import com.socialcommerce.socialcommerce.dto.CreatePublicationDto;
import com.socialcommerce.socialcommerce.dto.ShowPublicationDto;
import com.socialcommerce.socialcommerce.exception.NotFoundException;
import com.socialcommerce.socialcommerce.model.Buyer;
import com.socialcommerce.socialcommerce.model.Category;
import com.socialcommerce.socialcommerce.model.Publication;
import com.socialcommerce.socialcommerce.model.Seller;
import com.socialcommerce.socialcommerce.repository.IBuyerRepo;
import com.socialcommerce.socialcommerce.repository.ICategoryRepo;
import com.socialcommerce.socialcommerce.repository.IPublicationRepo;
import com.socialcommerce.socialcommerce.repository.ISellerRepo;
import com.socialcommerce.socialcommerce.service.publicationService.PublicationService;
import com.socialcommerce.socialcommerce.utils.BuyerUtils;
import com.socialcommerce.socialcommerce.utils.PublicationUtils;
import com.socialcommerce.socialcommerce.utils.SellerUtils;
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
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PublicationServiceTest {

    @Mock
    IPublicationRepo publicationRepo;

    @Mock
    ISellerRepo sellerRepo;
    @Mock
    ICategoryRepo categoryRepo;
    @Mock
    IBuyerRepo buyerRepo;

    @InjectMocks
    PublicationService publicationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldBeAbleToCreateNewPublication() {
        Seller aValidSeller = SellerUtils.createAValidSeller();
        aValidSeller.setSellerId(1L);

        CreatePublicationDto createPublicationDto = PublicationUtils.createCreatePublicationDto();

        when(sellerRepo.findById(1L)).thenReturn(Optional.of(aValidSeller));
        when(categoryRepo.findById(any())).thenReturn(Optional.of(new Category()));

        CreatePublicationDto aNewPost = publicationService.createANewPost(createPublicationDto, aValidSeller.getSellerId());

        assertEquals(createPublicationDto.description(), aNewPost.description());
        assertEquals(createPublicationDto.has_promotion(), aNewPost.has_promotion());
        assertEquals(createPublicationDto.category(), aNewPost.category());
    }

    @Test
    void shouldThrowErrorWhenTryCreateANewPublication() {
        when(sellerRepo.findById(1L)).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(NotFoundException.class, () -> {
            publicationService.createANewPost(PublicationUtils.createCreatePublicationDto(), 1L);
        });

        assertEquals("User id not found", exception.getMessage());
    }

    @Test
    void shouldThrowErrorWhenTryCreateANewPublicationWithCategory() {
        Seller aValidSeller = SellerUtils.createAValidSeller();
        aValidSeller.setSellerId(1L);

        CreatePublicationDto createPublicationDto = PublicationUtils.createCreatePublicationDto();

        when(sellerRepo.findById(1L)).thenReturn(Optional.of(aValidSeller));
        when(categoryRepo.findById(any())).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(NotFoundException.class, () -> {
            publicationService.createANewPost(createPublicationDto, 1L);
        });

        assertEquals("Category Not Found", exception.getMessage());
    }

    @Test
    void shouldBeAbleToGetAllPublicationsByBuyer() {
        Buyer aValidBuyer = BuyerUtils.createAValidBuyer();
        aValidBuyer.setBuyerId(1L);
        aValidBuyer.setSellers(List.of(new Seller()));

        when(buyerRepo.findById(1L)).thenReturn(Optional.of(aValidBuyer));

        List<ShowPublicationDto> allPublicationByBuyer = publicationService.getAllPublicationByBuyer(1L);

        assertTrue(allPublicationByBuyer.isEmpty());
    }

    @Test
    void shouldThrowErrorWhenGetAllPublicationByBuyer() {
        when(buyerRepo.findById(1L)).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(NotFoundException.class, () -> {
            publicationService.getAllPublicationByBuyer( 1L);
        });

        assertEquals("Buyer Not found", exception.getMessage());
    }

    @Test
    void shouldBeAbleToGetAllPublicationsWithPromotion() {
        Buyer aValidBuyer = BuyerUtils.createAValidBuyer();
        Seller aValidSeller = SellerUtils.createAValidSeller();
        Publication publication = PublicationUtils.createPublication();


        aValidBuyer.setBuyerId(1L);
        publication.setSeller(aValidSeller);
        List<Publication> publicationList = new ArrayList<>(){{
            add(publication);
        }};
        aValidSeller.setPublications(publicationList);
        aValidBuyer.setSellers(List.of(aValidSeller));

        when(buyerRepo.findById(1L)).thenReturn(Optional.of(aValidBuyer));

        List<ShowPublicationDto> allPublicationByBuyer = publicationService.getAllByPromo(1L);

        assertEquals(1, allPublicationByBuyer.size());
        assertEquals("Description", allPublicationByBuyer.get(0).description());
    }

    @Test
    void shouldThrowErrorWhenGetAllPublicationWithPromotion() {
        when(buyerRepo.findById(1L)).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(NotFoundException.class, () -> {
            publicationService.getAllByPromo( 1L);
        });

        assertEquals("Buyer Not found", exception.getMessage());
    }

    @Test
    void shouldBeAbleToGetAllPublicationBySeller(){

        Seller aValidSeller = SellerUtils.createAValidSeller();
        Publication publication = PublicationUtils.createPublication();


        publication.setSeller(aValidSeller);
        List<Publication> publicationList = new ArrayList<>(){{
            add(publication);
        }};
        aValidSeller.setPublications(publicationList);

        when(sellerRepo.findById(1L)).thenReturn(Optional.of(aValidSeller));

        List<ShowPublicationDto> allPublicationByBuyer = publicationService.getAllBySeller(1L);

        assertEquals(1, allPublicationByBuyer.size());
        assertEquals("Description", allPublicationByBuyer.get(0).description());;
    }

    @Test
    void shouldThrowErrorWhenGetAllPublicationBySeller  () {
        when(sellerRepo.findById(1L)).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(NotFoundException.class, () -> {
            publicationService.getAllBySeller( 1L);
        });

        assertEquals("Seller id not found", exception.getMessage());
    }

    @Test
    void shouldBeAbleToGetAllPublicationsWithCategory() {
        Buyer aValidBuyer = BuyerUtils.createAValidBuyer();
        Seller aValidSeller = SellerUtils.createAValidSeller();
        Publication publication = PublicationUtils.createPublication();


        aValidBuyer.setBuyerId(1L);
        publication.setSeller(aValidSeller);
        publication.setCategory(new Category(1, "category"));
        List<Publication> publicationList = new ArrayList<>(){{
            add(publication);
        }};
        aValidSeller.setPublications(publicationList);
        aValidBuyer.setSellers(List.of(aValidSeller));

        when(buyerRepo.findById(1L)).thenReturn(Optional.of(aValidBuyer));

        List<ShowPublicationDto> allPublicationByBuyer = publicationService.getAllByCategoryType(1, 1L);

        assertEquals(1, allPublicationByBuyer.size());
        assertEquals("Description", allPublicationByBuyer.get(0).description());
        assertEquals(100D, allPublicationByBuyer.get(0).price());
    }

    @Test
    void shouldThrowErrorWhenGetAllPublicationWithCategory() {
        when(buyerRepo.findById(1L)).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(NotFoundException.class, () -> {
            publicationService.getAllByCategoryType( 1, 1L);
        });

        assertEquals("Buyer Not Found", exception.getMessage());
    }

    @Test
    void shouldBeAbleToGetAllPublicationsByMostPromotion() {
        Seller aValidSeller = SellerUtils.createAValidSeller();
        Publication publication1 = PublicationUtils.createPublication();
        Publication publication2 = PublicationUtils.createPublication();
        publication2.setDiscount_percentage(20F);

        publication1.setSeller(aValidSeller);
        publication2.setSeller(aValidSeller);
        List<Publication> publicationList = new ArrayList<>(){{
            add(publication1);
            add(publication2);
        }};
        aValidSeller.setPublications(publicationList);

        when(sellerRepo.findById(1L)).thenReturn(Optional.of(aValidSeller));

        List<ShowPublicationDto> allPublicationBySeller = publicationService.getAllPostsWithMorePromotion(1L);

        assertEquals(2, allPublicationBySeller.size());
        assertEquals(20F, allPublicationBySeller.get(0).discount());
        assertEquals(10F, allPublicationBySeller.get(1).discount());
    }

    @Test
    void shouldThrowErrorWhenGetAllPublicationWithMorePromotion () {
        when(sellerRepo.findById(1L)).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(NotFoundException.class, () -> {
            publicationService.getAllBySeller( 1L);
        });

        assertEquals("Seller id not found", exception.getMessage());
    }

    @Test
    void shouldBeAbleToDeletePublicationBySellerId() {
        Seller aValidSeller = SellerUtils.createAValidSeller();
        Publication publication = PublicationUtils.createPublication();

        publication.setSeller(aValidSeller);
        publication.setPublication_id(1L);
        aValidSeller.setSellerId(1L);
        aValidSeller.setPublications(new ArrayList<>(){{
            add(publication);
        }});

        when(sellerRepo.findById(1L)).thenReturn(Optional.of(aValidSeller));

        publicationService.deleteAPublicationBySellerId(1L, 1L);

        verify(sellerRepo).save(argThat(s -> s.getPublications().isEmpty()));
    }

    @Test
    void shouldThrowExceptionWhenSellerNotFound() {

        when(sellerRepo.findById(1L)).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(NotFoundException.class,
                () -> publicationService.deleteAPublicationBySellerId(1L, 10L));

        assertEquals("User id not found", exception.getMessage());

    }

    @Test
    void shouldThrowExceptionWhenPublicationNotFound() {
        //
        Seller aValidSeller = SellerUtils.createAValidSeller();
        Publication publication = PublicationUtils.createPublication();

        publication.setSeller(aValidSeller);
        publication.setPublication_id(1L);
        aValidSeller.setSellerId(1L);
        aValidSeller.setPublications(new ArrayList<>(){{
            add(publication);
        }});

        when(sellerRepo.findById(1L)).thenReturn(Optional.of(aValidSeller));

        NotFoundException exception = assertThrows(NotFoundException.class,
                () -> publicationService.deleteAPublicationBySellerId(1L, 10L));
        assertEquals("Publication not found for the given seller", exception.getMessage());
    }


}
