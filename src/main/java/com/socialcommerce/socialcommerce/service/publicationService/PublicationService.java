package com.socialcommerce.socialcommerce.service.publicationService;

import com.socialcommerce.socialcommerce.dto.*;
import com.socialcommerce.socialcommerce.exception.NotFoundException;
import com.socialcommerce.socialcommerce.model.*;
import com.socialcommerce.socialcommerce.repository.IBuyerRepo;
import com.socialcommerce.socialcommerce.repository.ICategoryRepo;
import com.socialcommerce.socialcommerce.repository.IPublicationRepo;
import com.socialcommerce.socialcommerce.repository.ISellerRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class PublicationService implements IPublicationService{

    private ISellerRepo sellerRepo;
    private IPublicationRepo publicationRepo;
    private ICategoryRepo categoryRepo;
    private IBuyerRepo buyerRepo;

    public PublicationService(ISellerRepo sellerRepo, IPublicationRepo publicationRepo, ICategoryRepo categoryRepo, IBuyerRepo buyerRepo) {
        this.sellerRepo = sellerRepo;
        this.publicationRepo = publicationRepo;
        this.categoryRepo = categoryRepo;
        this.buyerRepo = buyerRepo;
    }

    @Override
    public CreatePublicationDto createANewPost(CreatePublicationDto publicationDto, Long sellerId) {

        Seller seller = sellerRepo.findById(sellerId).orElseThrow(() -> new NotFoundException("User id not found"));

        Publication newPublication = fromPublicationDtoToPublication(publicationDto);
        Category category = categoryRepo.findById(newPublication.getCategory().getCategory_id())
                .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada: ID = " + newPublication.getCategory().getCategory_id()));


        newPublication.setSeller(seller);
        newPublication.setCategory(category);
        newPublication.setLikes(0);

        publicationRepo.save(newPublication);

        return publicationDto;
    }

    @Override
    public List<Publication> getAllPublications() {
        return publicationRepo.findAll();
    }


    @Override
    public List<ShowPublicationDto> getAllPublicationByBuyer (Long buyerId) {
        Buyer buyer = buyerRepo.findById(buyerId).orElseThrow(() -> new NotFoundException("Buyer Not found"));

        List<Publication> publicationList = buyer.getSellers().stream()
                .flatMap(seller -> seller.getPublications().stream())
                .toList();

        return fromPublicationToShowPublication(publicationList);

    }

    @Override
    public List<ShowPublicationDto> getAllByLocalDateOrder(Long buyerId, String type) {

        List<ShowPublicationDto> allPublicationByBuyer = getAllPublicationByBuyer(buyerId);

        if (type.equalsIgnoreCase("mostRecently")) {

            return allPublicationByBuyer.stream()
                    .sorted((p1, p2) -> p2.publicationDate().compareTo(p1.publicationDate()))
                    .collect(Collectors.toList());

        } else if (type.equalsIgnoreCase("oldest")) {

            return allPublicationByBuyer.stream()
                    .sorted(Comparator.comparing(ShowPublicationDto::publicationDate))
                    .collect(Collectors.toList());

        } else {
            throw new NotFoundException("Publications not found");
        }
    }

    @Override
    public List<ShowPublicationDto> getAllByPromo(Long buyerId) {
        Buyer buyer = buyerRepo.findById(buyerId).orElseThrow(() -> new NotFoundException("Buyer Not found"));

        List<Publication> publicationList = buyer.getSellers().stream()
                .flatMap(seller -> seller.getPublications().stream())
                .filter(p -> p.getHas_promotion().equals(true))
                .toList();

        return fromPublicationToShowPublication(publicationList);

    }

    @Override
    public void deleteAPublicationBySellerId(Long sellerId, Long publicationId) {
        Seller seller = sellerRepo.findById(sellerId).orElseThrow(() -> new NotFoundException("User id not found"));

        boolean removed = seller.getPublications()
                .removeIf(p -> p.getPublication_id().equals(publicationId));

        if (!removed) {
            throw new NotFoundException("Publication not found for the given seller");
        }

        sellerRepo.save(seller);
    }

    private Publication fromPublicationDtoToPublication(CreatePublicationDto publicationDto) {

        return new Publication(LocalDate.now(),
                fromProductDtoToProduct(publicationDto.product()),
                fromCategoryDtoToCategory(publicationDto.category()),
                publicationDto.discount_percentage(),
                publicationDto.has_promotion(),
                publicationDto.price());
    }

    private Product fromProductDtoToProduct(CreateProductDto productDto) {
        return new Product(
                productDto.product_name(),
                productDto.product_description(),
                productDto.product_image(),
                productDto.product_brand(),
                productDto.product_color()
        );
    }


    private Category fromCategoryDtoToCategory(CategoryDto categoryDto) {
            Category category = categoryRepo.findById(categoryDto.categoryID()).orElseThrow(() -> new NotFoundException("Category Not Found"));
        return new Category(category.getCategory_id(), category.getCategoryName());
    }

    private List<ShowPublicationDto> fromPublicationToShowPublication(List<Publication> publication){
        List<ShowPublicationDto> publicationDtos = new ArrayList<>();

        for (Publication publi : publication) {
            ShowPublicationDto dto = new ShowPublicationDto(publi.getPublication_date()
                    , new ShowProductDto(publi.getProduct().getProduct_name(), publi.getProduct().getProduct_image())
                    , publi.getDiscount_percentage()
                    , publi.getPrice()
                    , publi.getLikes());

            publicationDtos.add(dto);
        }

        return publicationDtos;

    }


}
