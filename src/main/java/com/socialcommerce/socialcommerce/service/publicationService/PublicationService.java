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
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
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
    public CreatePublicationDto createANewPost(CreatePublicationDto publicationDto, UUID sellerId) {

        Seller seller = sellerRepo.findById(sellerId).orElseThrow(() -> new NotFoundException("User id not found"));

        Publication newPublication = fromPublicationDtoToPublication(publicationDto);
        Category existingCategory = categoryRepo.findByCategoryName(newPublication.getCategory().getCategoryName());
        if (existingCategory == null) {
            categoryRepo.save(newPublication.getCategory());
        } else {
            newPublication.setCategory(existingCategory);
        }


        newPublication.setSeller(seller);
        newPublication.setLikes(0);

        publicationRepo.save(newPublication);

        return publicationDto;
    }

    @Override
    public List<Publication> getAllPublications() {
        return publicationRepo.findAll();
    }


    @Override
    public List<ShowPublicationDto> getAllPublicationByBuyer (UUID buyerId) {
        Buyer buyer = buyerRepo.findById(buyerId).orElseThrow(() -> new NotFoundException("Buyer Not found"));

        List<Publication> publicationList = buyer.getSellers().stream()
                .flatMap(seller -> seller.getPublications().stream())
                .toList();

        return fromPublicationToShowPublication(publicationList);

    }

    @Override
    public List<ShowPublicationDto> getAllByLocalDateOrder(String type) {
        if(type.equalsIgnoreCase("mostRecently")){
            List<Publication> allByLocalDateOrderAsc = publicationRepo.getAllByLocalDateOrderAsc();

            return fromPublicationToShowPublication(allByLocalDateOrderAsc);
        }
        else if (type.equalsIgnoreCase("oldest")){
            List<Publication> allByLocalDateOrderDesc = publicationRepo.getAllByLocalDateOrderDesc();

             return fromPublicationToShowPublication(allByLocalDateOrderDesc);
        }
        else {
            throw new NotFoundException("Publications not found");
        }
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
        return new Category(categoryDto.category_name());
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
