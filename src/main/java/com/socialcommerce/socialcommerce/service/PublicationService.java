package com.socialcommerce.socialcommerce.service;

import com.socialcommerce.socialcommerce.dto.CategoryDto;
import com.socialcommerce.socialcommerce.dto.CreateProductDto;
import com.socialcommerce.socialcommerce.dto.CreatePublicationDto;
import com.socialcommerce.socialcommerce.exception.NotFoundException;
import com.socialcommerce.socialcommerce.model.Category;
import com.socialcommerce.socialcommerce.model.Product;
import com.socialcommerce.socialcommerce.model.Publication;
import com.socialcommerce.socialcommerce.model.Seller;
import com.socialcommerce.socialcommerce.repository.IPublicationRepo;
import com.socialcommerce.socialcommerce.repository.ISellerRepo;
import jakarta.persistence.criteria.From;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PublicationService {

    private ISellerRepo sellerRepo;
    private IPublicationRepo publicationRepo;

    public PublicationService(ISellerRepo sellerRepo, IPublicationRepo publicationRepo) {
        this.sellerRepo = sellerRepo;
        this.publicationRepo = publicationRepo;
    }

    public CreatePublicationDto createANewPost (CreatePublicationDto publicationDto, UUID sellerId) {

        Seller seller = sellerRepo.findById(sellerId).orElseThrow(() -> new NotFoundException("User id not found"));

        Publication newPublication = fromPublicationDtoToPublication(publicationDto);
        newPublication.setSeller(seller);

        seller.getPublications().add(newPublication);

        sellerRepo.save(seller);

        publicationRepo.save(newPublication);

        return publicationDto;
    }

    public List<Publication> getAllPublications() {
        return publicationRepo.findAll();
    }

    private Publication fromPublicationDtoToPublication(CreatePublicationDto publicationDto) {
        Double priceWithDiscount = 0D;
        if(publicationDto.has_promotion().equals(true)){
            priceWithDiscount = (publicationDto.price()*publicationDto.discount_percentage());
        } else {
            priceWithDiscount = (publicationDto.price());
        }
        return new Publication(LocalDate.now(),
                fromProductDtoToProduct(publicationDto.product()),
                publicationDto.discount_percentage(),
                publicationDto.has_promotion(),
                priceWithDiscount);
    }

    private Product fromProductDtoToProduct(CreateProductDto productDto) {
        return new Product(
                productDto.product_name(),
                productDto.product_description(),
                productDto.product_image(),
                productDto.product_brand(),
                productDto.product_color(),
                productDto.categories().stream()
                        .map(this::fromCategoryDtoToCategory)
                        .collect(Collectors.toList())

        );
    }

    private Category fromCategoryDtoToCategory(CategoryDto categoryDto) {
        return new Category(categoryDto.category_name());
    }
}
