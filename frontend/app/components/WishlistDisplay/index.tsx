import style from "./style.module.scss";
import xFill from "~/assets/icons/x-circle-fill.svg";
import {Form} from "@remix-run/react";
import {PublicationsResultType} from "~/routes/buyer";
import WishItem from "~/components/WishlistDisplay/WishItem";
import {Dispatch, SetStateAction} from "react";

type WishlistItemsProps = {
    wishlistItems: PublicationsResultType[];
    setWishlistItems: Dispatch<SetStateAction<PublicationsResultType[]>>;
}

export default function WishlistDisplay({wishlistItems, setWishlistItems}: WishlistItemsProps) {
    let wishlistTotalPrice = 0;

    return (
        <section className={style.wishlist__display}>
            <div className={style.wishlist__container}>
                <div className={style.wishlist__headers}>
                    <h1 className={style.wishlist__headline}>Lista de Desejos</h1>
                    <Form method={"post"}>
                        <input type="hidden" name={"_action"} value={"close_wishlist"}/>
                        <button className={style.wishlist__close}><img className={style.close__image} src={xFill}
                                                                       alt="Fechar"/>
                        </button>
                    </Form>
                </div>

                {wishlistItems.length > 0
                    ?
                    <ul className={style.wishes__list}>
                        {wishlistItems.map(wishlistItem => {
                            wishlistTotalPrice += wishlistItem.discount > 0 ? wishlistItem.price - (wishlistItem.price * wishlistItem.discount / 100) : wishlistItem.price;
                            return (
                                <WishItem setCartList={setWishlistItems} cartList={wishlistItems} publicationId={wishlistItem.publicationId} productImg={wishlistItem.imagePath}
                                          productName={wishlistItem.productName}
                                          productPrice={wishlistItem.discount > 0 ? wishlistItem.price - (wishlistItem.price * wishlistItem.discount / 100) : wishlistItem.price}/>
                            )
                        })}
                    </ul>
                    :
                    <div className={style.empty__wishlist}>
                        <h1 className={style.empty__message}>Sua lista de desejos está vazia!</h1>
                    </div>
                }

                <div className={style.price__total}>
                    <h1 className={style.total__headline}>Preço Total:</h1>
                    <p className={style.total__amount}>R$ <span
                        className={style.amount__price}>{wishlistTotalPrice}</span></p>
                </div>
            </div>

        </section>
    );
}