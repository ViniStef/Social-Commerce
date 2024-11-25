package com.socialcommerce.socialcommerce.service.registerServiceTest;

import com.socialcommerce.socialcommerce.exception.AlreadyExistsException;
import com.socialcommerce.socialcommerce.model.Buyer;
import com.socialcommerce.socialcommerce.model.Seller;
import com.socialcommerce.socialcommerce.repository.IBuyerRepo;
import com.socialcommerce.socialcommerce.repository.ISellerRepo;
import com.socialcommerce.socialcommerce.service.registerService.RegisterService;
import com.socialcommerce.socialcommerce.utils.BuyerUtils;
import com.socialcommerce.socialcommerce.utils.SellerUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class RegisterServiceTest {

    @Mock
    ISellerRepo sellerRepo;

    @Mock
    IBuyerRepo buyerRepo;

    @InjectMocks
    RegisterService registerService;

    @Test
    void shouldBeAbleToValidateIfTheEmailIsInUseSeller(){
        Seller aValidSeller = SellerUtils.createAValidSeller();
        when(sellerRepo.findByEmail(aValidSeller.getEmail())).thenReturn(aValidSeller);

        AlreadyExistsException exceptionSeller = Assertions.assertThrows(AlreadyExistsException.class, () -> {
            registerService.isEmailUsed("seller", aValidSeller.getEmail());
        });

        Assertions.assertEquals("This email already exists", exceptionSeller.getMessage());

    }

    @Test
    void shouldBeAbleToValidateIfTheEmailIsInUseBuyer(){
        Buyer aValidBuyer = BuyerUtils.createAValidBuyer();
        when(buyerRepo.findByEmail(aValidBuyer.getEmail())).thenReturn(aValidBuyer);

        AlreadyExistsException exceptionBuyer = Assertions.assertThrows(AlreadyExistsException.class, () -> {
            registerService.isEmailUsed("buyer", aValidBuyer.getEmail());
        });

        Assertions.assertEquals("This email already exists", exceptionBuyer.getMessage());
    }

    @Test
    void shouldReturnFalseWhenBuyerNotExist(){
        Buyer aValidBuyer = BuyerUtils.createAValidBuyer();
        when(buyerRepo.findByEmail(aValidBuyer.getEmail())).thenReturn(null);

        Assertions.assertEquals(false, registerService.isEmailUsed("buyer", aValidBuyer.getEmail()));
    }

    @Test
    void shouldReturnFalseWhenSellerNotExist(){
        Seller aValidSeller = SellerUtils.createAValidSeller();
        when(sellerRepo.findByEmail(aValidSeller.getEmail())).thenReturn(null);

        Assertions.assertEquals(false, registerService.isEmailUsed("buyer", aValidSeller.getEmail()));
    }
}
