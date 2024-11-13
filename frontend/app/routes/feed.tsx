import style from "~/styles/feed.module.scss";
import logo from "~/assets/icons/social-commerce-logo.svg";
import menu from "~/assets/images/list.svg";
import pedro from "~/assets/images/pedro.webp";
import details from "~/assets/images/three-dots-vertical.svg";
import like from "~/assets/images/heart-svgrepo-com.svg";
import bookmark from "~/assets/images/bookmark.svg";
import bag from "~/assets/images/bag.svg";
import product from "~/assets/images/product_shirt.webp";
import search from "~/assets/images/search.svg";
import house from "~/assets/images/house.svg";
import bookmarks from "~/assets/images/bookmarks.svg";
import follows from "~/assets/images/follows.svg";

export default function FeedPage() {
    return (
        <div className={style.page__container}>
            <main className={style.feed__container}>
                <nav className={style.navbar__feed}>
                    <div className={style.feed__content}>
                        <div className={style.logo__content}>
                            <img className={style.logo__image} src={logo} alt={"Social Commerce"}/>
                            <h1 className={style.logo__name}>Social Commerce</h1>
                        </div>

                        <div className={style.content__search}>
                            <div className={style.search__field}>
                                <label className={style.sr__only} htmlFor="search">O que você está buscando?</label>
                                <input className={`${style.standard__input} ${style.field__input}`} name={"search"}
                                       id={"search"} placeholder={"O que você está buscando?"}/>
                                <button aria-label={"buscar"} className={style.field__submit}></button>
                            </div>

                            <menu className={style.search__menu}>
                                <button className={style.menu__button}><img className={style.button__image} src={menu}
                                                                            alt="Menu"/></button>
                            </menu>
                        </div>
                    </div>
                </nav>

                <section className={style.category__section}>
                    <h1 className={style.category__title}>Categorias</h1>
                    <div className={style.separation__div}></div>
                    <ul className={style.category__list}>
                        <li className={style.item__category}>
                            <img src={pedro} className={style.category__image} alt="Produto"/>
                            <p className={style.category__name}>Roupas</p>
                        </li>
                        <li className={style.item__category}>
                            <img src={pedro} className={style.category__image} alt="Produto"/>
                            <p className={style.category__name}>Smartphone</p>
                        </li>
                        <li className={style.item__category}>
                            <img src={pedro} className={style.category__image} alt="Produto"/>
                            <p className={style.category__name}>Jogos</p>
                        </li>
                        <li className={style.item__category}>
                            <img src={pedro} className={style.category__image} alt="Produto"/>
                            <p className={style.category__name}>Cosméticos</p>
                        </li>
                        <li className={style.item__category}>
                            <img src={pedro} className={style.category__image} alt="Produto"/>
                            <p className={style.category__name}>Natal</p>
                        </li>

                        <button className={style.carousel__right}></button>
                    </ul>
                </section>


                <section>
                    <div className={style.feed__choices}>
                        <div className={style.choice__followed}>
                            <p>Seguidos</p>
                            <div className={style.choice__indicator}></div>
                        </div>
                        <div className={style.choice__recommended}>
                            <p>Para você</p>
                        </div>
                    </div>

                    <div className={style.post__container}>
                        <fieldset className={style.post__field}>
                            <legend className={style.field__brand}>
                                <img className={style.brand__image} src={logo}/>
                                <span className={style.brand__name}>Social Commerce</span>
                            </legend>


                            <div className={style.post__details}>
                                <div className={style.post__date}>
                                    <p className={style.date__text}>54 Min</p>
                                </div>
                                <img className={style.post__extra} src={details} alt="detalhes"/>
                            </div>

                            <div className={style.separation__div}></div>

                            <div className={style.post__description}>
                                <p className={style.description__text}>🌟 Promoção imperdível! 🌟<br/><br/>

                                    Que tal renovar o guarda-roupa com estilo e ainda economizar?
                                    🤑 Todas as nossas camisetas estão com 10% de desconto! Isso mesmo, é a sua
                                    chance de garantir aquelas peças incríveis que você já estava de olho. <br/><br/>

                                    Mas corra, porque essa oferta é por tempo limitado!
                                    Aproveite e vista-se com o melhor da moda! 👕✨ <br/><br/>

                                    👉 Link na bio para conferir nossos modelos!🤔</p>
                            </div>

                            <div className={style.post__product}>
                                <img className={style.product__image} src={product} alt=""/>
                                <span className={style.product__discount}>-10%</span>
                            </div>


                            <div className={style.post__reactions}>
                                <div className={style.reaction__container}>
                                    <img className={style.reaction__image} src={like} alt="gostar"/>
                                </div>
                                <div className={style.reaction__container}>
                                    <img className={style.reaction__image} src={bag} alt="lista de desejos"/>
                                </div>
                                <div className={style.reaction__container}>
                                    <img className={style.reaction__image} src={bookmark} alt="salvar"/>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    <br/>

                    <div className={style.post__container}>
                        <fieldset className={style.post__field}>
                            <legend className={style.field__brand}>
                                <img className={style.brand__image} src={logo}/>
                                <span className={style.brand__name}>Social Commerce</span>
                            </legend>


                            <div className={style.post__details}>
                                <div className={style.post__date}>
                                    <p className={style.date__text}>54 Min</p>
                                </div>
                                <img className={style.post__extra} src={details} alt="detalhes"/>
                            </div>

                            <div className={style.separation__div}></div>

                            <div className={style.post__description}>
                                <p className={style.description__text}>🌟 Promoção imperdível! 🌟<br/><br/>

                                    Que tal renovar o guarda-roupa com estilo e ainda economizar?
                                    🤑 Todas as nossas camisetas estão com 10% de desconto! Isso mesmo, é a sua
                                    chance de garantir aquelas peças incríveis que você já estava de olho. <br/><br/>

                                    Mas corra, porque essa oferta é por tempo limitado!
                                    Aproveite e vista-se com o melhor da moda! 👕✨ <br/><br/>

                                    👉 Link na bio para conferir nossos modelos!🤔</p>
                            </div>

                            <div className={style.post__product}>
                                <img className={style.product__image} src={product} alt=""/>
                                <span className={style.product__discount}>-10%</span>
                            </div>


                            <div className={style.post__reactions}>
                                <div className={style.reaction__container}>
                                    <img className={style.reaction__image} src={like} alt="gostar"/>
                                </div>
                                <div className={style.reaction__container}>
                                    <img className={style.reaction__image} src={bag} alt="lista de desejos"/>
                                </div>
                                <div className={style.reaction__container}>
                                    <img className={style.reaction__image} src={bookmark} alt="salvar"/>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </section>

                <section className={style.user__features}>
                    <ul className={style.feature__list}>
                        <li className={style.feature__group}>
                            <li className={style.feature__item}>
                                <button className={style.feature__action}><img className={style.action__image}
                                                                               src={search}
                                                                               alt="buscar"/></button>
                            </li>
                            <li className={style.feature__item}>
                                <button className={style.feature__action}><img className={style.action__image}
                                                                               src={house}
                                                                               alt="início"/></button>
                            </li>
                        </li>

                        <li className={`${style.feature__item} ${style.profile__item}`}>
                            <button className={style.feature__action}>
                                <img className={style.action__image} src={pedro} alt="início"/>
                                <p className={style.action__name}>Meu Perfil</p>
                            </button>
                        </li>
                        <li className={style.feature__group}>
                            <li className={style.feature__item}>
                                <button className={style.feature__action}><img className={style.action__image}
                                                                               src={follows}
                                                                               alt="seguidos"/></button>
                            </li>
                            <li className={style.feature__item}>
                                <button className={style.feature__action}><img className={style.action__image}
                                                                               src={bookmarks} alt="bookmarks"/>
                                </button>
                            </li>
                        </li>

                    </ul>

                </section>

            </main>


            <section className={style.user__container}>
                <div className={style.user__info}>
                    <img className={style.user__image} src={pedro} alt=""/>
                    <p className={style.user__name}>Pedro Pedrinho</p>
                    <div className={style.separation__div}></div>
                </div>

                <div className={style.user__follows}>
                    <h1 className={style.follow__headline}>
                        Seguindo
                    </h1>
                    <div className={style.separation__div}></div>

                    <ul className={style.follows__list}>
                        <li className={style.follows__item}>
                            <img className={style.follows__image} src={logo} alt=""/>
                            <p></p>
                        </li>
                    </ul>
                </div>
            </section>
        </div>

    )
}