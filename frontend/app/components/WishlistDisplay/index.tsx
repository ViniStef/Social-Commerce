import style from "./style.module.scss";
import xFill from "~/assets/icons/x-circle-fill.svg";
import netshoes from "~/assets/images/netshoes-logo.png";
import background from "~/assets/images/card-image.svg";
import {Form} from "@remix-run/react";
import {PublicationsResultType} from "~/routes/buyer";
import WishItem from "~/components/WishlistDisplay/WishItem";

type WishlistItemsProps = {
    wishlistItems: PublicationsResultType[];
}

export default function WishlistDisplay({wishlistItems}: WishlistItemsProps) {
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

                <ul className={style.wishes__list}>
                    {wishlistItems.map(wishlistItem => {
                        return (
                            <WishItem publicationId={wishlistItem.publicationId} productImg={wishlistItem.imagePath}
                                      productName={wishlistItem.productName}
                                      productPrice={wishlistItem.discount > 0 ? wishlistItem.price * (wishlistItem.discount / 100) : wishlistItem.price}/>
                        )
                    })}
                    {/*<li className={style.wish__item}>*/}
                    {/*    <img className={style.wish__image} src={netshoes} alt="Imagem do Produto"/>*/}
                    {/*    <div className={style.wish__info}>*/}
                    {/*        <p className={style.info__name}>Lorem ipsum dolor sit.</p>*/}
                    {/*        <p className={style.info__price}>R$ <span className={style.price__value}>000,00</span></p>*/}
                    {/*    </div>*/}

                    {/*    <button className={style.wish__remove}>*/}
                    {/*        Remover*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                    {/*<li className={style.wish__item}>*/}
                    {/*    <img className={style.wish__image} src={netshoes} alt="Imagem do Produto"/>*/}
                    {/*    <div className={style.wish__info}>*/}
                    {/*        <p className={style.info__name}>Lorem ipsum dolor sit amet, consectetur adipisicing*/}
                    {/*            elit.</p>*/}
                    {/*        <p className={style.info__price}>R$ <span className={style.price__value}>000,00</span></p>*/}
                    {/*    </div>*/}

                    {/*    <button className={style.wish__remove}>*/}
                    {/*        Remover*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                    {/*<li className={style.wish__item}>*/}
                    {/*    <img className={style.wish__image} src={netshoes} alt="Imagem do Produto"/>*/}
                    {/*    <div className={style.wish__info}>*/}
                    {/*        <p className={style.info__name}>Lorem ipsum dolor sit amet, consectetur adipisicing*/}
                    {/*            elit.</p>*/}
                    {/*        <p className={style.info__price}>R$ <span className={style.price__value}>000,00</span></p>*/}
                    {/*    </div>*/}

                    {/*    <button className={style.wish__remove}>*/}
                    {/*        Remover*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                    {/*<li className={style.wish__item}>*/}
                    {/*    <img className={style.wish__image} src={netshoes} alt="Imagem do Produto"/>*/}
                    {/*    <div className={style.wish__info}>*/}
                    {/*        <p className={style.info__name}>Lorem ipsum dolor sit amet, consectetur adipisicing*/}
                    {/*            elit.</p>*/}
                    {/*        <p className={style.info__price}>R$ <span className={style.price__value}>000,00</span></p>*/}
                    {/*    </div>*/}

                    {/*    <button className={style.wish__remove}>*/}
                    {/*        Remover*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                    {/*<li className={style.wish__item}>*/}
                    {/*    <img className={style.wish__image} src={netshoes} alt="Imagem do Produto"/>*/}
                    {/*    <div className={style.wish__info}>*/}
                    {/*        <p className={style.info__name}>Lorem ipsum dolor sit amet, consectetur adipisicing*/}
                    {/*            elit.</p>*/}
                    {/*        <p className={style.info__price}>R$ <span className={style.price__value}>000,00</span></p>*/}
                    {/*    </div>*/}

                    {/*    <button className={style.wish__remove}>*/}
                    {/*        Remover*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                    {/*<li className={style.wish__item}>*/}
                    {/*    <img className={style.wish__image} src={netshoes} alt="Imagem do Produto"/>*/}
                    {/*    <div className={style.wish__info}>*/}
                    {/*        <p className={style.info__name}>Lorem ipsum dolor sit amet, consectetur adipisicing*/}
                    {/*            elit.</p>*/}
                    {/*        <p className={style.info__price}>R$ <span className={style.price__value}>000,00</span></p>*/}
                    {/*    </div>*/}

                    {/*    <button className={style.wish__remove}>*/}
                    {/*        Remover*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                    {/*<li className={style.wish__item}>*/}
                    {/*    <img className={style.wish__image} src={netshoes} alt="Imagem do Produto"/>*/}
                    {/*    <div className={style.wish__info}>*/}
                    {/*        <p className={style.info__name}>Lorem ipsum dolor sit amet, consectetur adipisicing*/}
                    {/*            elit.</p>*/}
                    {/*        <p className={style.info__price}>R$ <span className={style.price__value}>000,00</span></p>*/}
                    {/*    </div>*/}

                    {/*    <button className={style.wish__remove}>*/}
                    {/*        Remover*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                    {/*<li className={style.wish__item}>*/}
                    {/*    <img className={style.wish__image} src={background} alt="Imagem do Produto"/>*/}
                    {/*    <div className={style.wish__info}>*/}
                    {/*        <p className={style.info__name}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.*/}
                    {/*            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, nostrum?</p>*/}
                    {/*        <p className={style.info__price}>R$ <span className={style.price__value}>000,00</span></p>*/}
                    {/*    </div>*/}

                    {/*    <button className={style.wish__remove}>*/}
                    {/*        Remover*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                </ul>

                <div className={style.price__total}>
                    <h1 className={style.total__headline}>Preço Total:</h1>
                    <p className={style.total__amount}>R$ <span className={style.amount__price}>000,00</span></p>
                </div>
            </div>

        </section>
    );
}