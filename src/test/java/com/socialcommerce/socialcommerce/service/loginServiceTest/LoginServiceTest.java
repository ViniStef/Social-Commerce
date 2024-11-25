package com.socialcommerce.socialcommerce.service.loginServiceTest;

import com.socialcommerce.socialcommerce.model.Buyer;
import com.socialcommerce.socialcommerce.model.Seller;
import com.socialcommerce.socialcommerce.repository.IBuyerRepo;
import com.socialcommerce.socialcommerce.repository.ISellerRepo;
import com.socialcommerce.socialcommerce.service.loginService.LoginService;
import com.socialcommerce.socialcommerce.utils.BuyerUtils;
import com.socialcommerce.socialcommerce.utils.SellerUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class LoginServiceTest {

    @Mock
    ISellerRepo sellerRepo;

    @Mock
    IBuyerRepo buyerRepo;

    @InjectMocks
    LoginService loginService;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldBeAbleToLoginSeller() {
        Seller aValidSeller = SellerUtils.createAValidSeller();
        aValidSeller.setSellerId(1L);
        aValidSeller.setPassword("sellerPassword");

        when(sellerRepo.findByEmail(aValidSeller.getEmail())).thenReturn(aValidSeller);


        Object sellerLogin = loginService.login(aValidSeller.getEmail(), aValidSeller.getPassword());

        Map<String, String> expectedSellerResponse = new HashMap<>() {{
            put("accountType", "seller");
            put("userId", aValidSeller.getSellerId().toString());
        }};
        assertEquals(expectedSellerResponse, sellerLogin);
    }

    @Test
    void shouldBeAbleToLoginBuyer() {

        Buyer aValidBuyer = BuyerUtils.createAValidBuyer();
        aValidBuyer.setBuyerId(2L);
        aValidBuyer.setPassword("buyerPassword");

        when(buyerRepo.findByEmail(aValidBuyer.getEmail())).thenReturn(aValidBuyer);

        Object buyerLogin = loginService.login(aValidBuyer.getEmail(), aValidBuyer.getPassword());

        Map<String, String> expectedBuyerResponse = new HashMap<>() {{
            put("accountType", "buyer");
            put("userId", aValidBuyer.getBuyerId().toString());
        }};
        assertEquals(expectedBuyerResponse, buyerLogin);
    }

    @Test
    void shouldThrowFalseWhenTryLoginWithSeller(){

        Seller aValidSeller = SellerUtils.createAValidSeller();
        aValidSeller.setSellerId(1L);
        aValidSeller.setPassword("sellerPassword");

        when(sellerRepo.findByEmail(aValidSeller.getEmail())).thenReturn(aValidSeller);

        Object sellerLogin = loginService.login(aValidSeller.getEmail(), " ");

        assertEquals(false, sellerLogin);
    }

    @Test
    void shouldThrowFalseWhenTryLoginWithBuyer(){

        Buyer aValidBuyer = BuyerUtils.createAValidBuyer();
        aValidBuyer.setBuyerId(2L);
        aValidBuyer.setPassword("buyerPassword");

        when(buyerRepo.findByEmail(aValidBuyer.getEmail())).thenReturn(aValidBuyer);

        Object buyerLogin = loginService.login(aValidBuyer.getEmail(), " ");

        assertEquals(false, buyerLogin);
    }
}



