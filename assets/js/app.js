var windowWidth = document.documentElement.clientWidth;
window.addEventListener("resize", () => {
    windowWidth = document.documentElement.clientWidth;
});

let handleApplyCollapse = function ($parent, $firstItem = false, $callFunction = false) {
    let $childUl = $parent.find('> li > ul');
    if ($childUl.length === 0) {
        return;
    }

    if ($callFunction) {
        $parent.find('> li a').each(function () {
            $(this).attr('data-href', $(this).attr('href'))
        });
    }

    if (windowWidth <= 991) {

        let $objParentAttr = {};
        let $objChildrenAttr = {
            'data-bs-parent': '#' + $parent.attr('id')
        }

        if ($firstItem) {
            let $parentID = 'menu-' + Math.random().toString(36).substring(7);
            $parent.attr('id', $parentID);
            $objParentAttr = {
                'data-bs-parent': '#' + $parentID
            }

            $objChildrenAttr = {};
        }

        $childUl.each(function () {
            let $parentUl = $(this).closest('ul');
            let $parentListItem = $(this).closest('li');
            let $parentListItemAnchor = $parentListItem.children('a');

            let $parentUlID = 'menu-' + Math.random().toString(36).substring(7);

            $parentUl.addClass('collapse').attr({
                'id': 'collapse-' + $parentUlID, ...$objParentAttr, ...$objChildrenAttr
            });

            $parentListItemAnchor.replaceWith(function () {
                return `<button aria-label="${$parentListItemAnchor.attr('aria-label')}" data-href="${$parentListItemAnchor.attr('data-href')}" data-bs-toggle="collapse" data-bs-target="#${$parentUl.attr('id')}">${$parentListItemAnchor.html()}</button>`
            })

            handleApplyCollapse($parentUl, false);

            $parentUl.on('show.bs.collapse', function () {
                $parent.find('.collapse.show').not($parentUl).collapse('hide');
            });
        });
    } else {
        $parent.removeAttr('id');

        $childUl.each(function () {
            let $parentUl = $(this).closest('ul');
            let $parentListItem = $(this).closest('li');

            $parentUl.removeClass('collapse').removeAttr('data-bs-parent id');
            $parentListItem.children('a').attr('href', $parentListItem.children('a').attr('data-href'));

            $parentListItem.children('button').replaceWith(function () {
                return `<a aria-label="${$(this).attr('aria-label')}" href="${$(this).attr('data-href')}" data-href="${$(this).attr('data-href')}">${$(this).html()}</a>`
            })

            handleApplyCollapse($parentUl);
        });
    }
}

let handleCallMenu = function () {
    const $body = $('body');
    const handleBody = function ($toggle = false) {
        if ($body.hasClass('is-navigation')) {
            $body.removeClass('is-navigation');
            if ($body.hasClass('is-overflow')) {
                $body.removeClass('is-overflow');
            }

            $('#header-navigation ul').collapse('hide');
        } else {
            if ($toggle) {
                $body.addClass('is-navigation is-overflow')
            }
        }
    }

    if (windowWidth <= 991) {
        const $hamburger = $('#hamburger-button');
        if ($hamburger.length) {
            $hamburger.click(function () {
                handleBody(true)
            });
        }

        const $overlay = $('#header-overlay');
        if ($overlay.length) {
            $overlay.click(function () {
                handleBody();
            });
        }
    } else {
        handleBody();
    }
}

const handleStickHeader = function () {
    $(window).scroll(function (e) {
        if ($(document).scrollTop() > $('#header').innerHeight()) {
            $('#header').addClass('is-scroll');
            $('#header-category').removeClass('is-default is-show');
        } else {
            $('#header').removeClass('is-scroll');
            if ($('body').hasClass('is-home') == true) {
                $('#header-category').addClass('is-default');
            }
        }
    });
}

const handleCategoryBar = function () {
    const buttonCall = $('#callCategory');
    const category = $('#header-category');
    if (category.length && buttonCall.length) {
        buttonCall.click(function () {
            if (category.hasClass('is-default') == true) {
                return;
            }

            if (category.hasClass('is-show') == false) {
                category.addClass('is-show');
            } else {
                category.removeClass('is-show');
            }
        });
    }
}

let handleCategoryMobile = function () {
    const $body = $('body');
    const handleBody = function ($toggle = false) {
        if ($body.hasClass('is-category')) {
            $body.removeClass('is-category');
            if ($body.hasClass('is-overflow')) {
                $body.removeClass('is-overflow');
            }
        } else {
            if ($toggle) {
                $body.addClass('is-category is-overflow')
            }
        }
    }

    if (windowWidth <= 991) {
        const $btnCall = $('#callCategoryMobile');
        if ($btnCall.length) {
            $btnCall.click(function () {
                handleBody(true)
            });
        }

        const $overlay = $('#sidebar-overlay');
        const $buttonClose = $('#closeCategoryMobile');
        if ($overlay.length && $buttonClose.length) {
            $overlay.add($buttonClose).click(function () {
                handleBody();
            });
        }
    } else {
        handleBody();
    }
}

const handleCart = function () {
    const floatingCart = $('#floatingCart');

    if (floatingCart.length) {
        /***
         * Xử lý đóng mở giỏ hàng
         * Xử lý render html product trong giỏ hàng
         */
        const handleToggleCart = function (hasProduct = false) {
            const btnCall = $('#callCart');
            const btnCallMobile = $('#callCartMobile');
            const btnClose = $('#closeCart');
            const floatingOverlay = $('#floatingOverlay');
            const body = $('body');

            btnCall.add(btnCallMobile).click(function () {
                body.addClass('is-cart');
            });

            btnClose.add(floatingOverlay).click(function () {
                body.removeClass('is-cart');
            });

            if (hasProduct == true) {
                const htmlProduct = `<div class="card-item align-items-start gap-10px hstack">
                            <div class="card-image flex-shrink-0">
                                <a href="" class="d-inline-flex align-middle">
                                    <img src="./assets/images/product/Dau-bao-khoi-CM-1.jpg"
                                         class="w-100 img-fluid transition-default" alt="">
                                </a>
                            </div>
                            <div class="card-content flex-fill">
                                <a href="" class="card-title limit">
                                    Đầu báo khói quang CM WT-32L Chungmei giá rẻ nhất thị trường Việt Nam
                                </a>
                                <div class="hstack gap-8px justify-content-between">
                                    <div class="card-quantity w-50 flex-fill">
                                        <div class="card-text">
                                            Số lượng
                                        </div>
                                        <div class="card-group hstack flex-nowrap">
                                            <button disabled
                                                    class="link-default hstack justify-content-center flex-shrink-0 card-quantity_btn">
                                                <i class="fal fa-minus"></i>
                                            </button>
                                            <input type="text" class="form-control card-quantity_input" value="1">
                                            <button class="link-default hstack justify-content-center flex-shrink-0 card-quantity_btn">
                                                <i class="fal fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="card-desc w-50 flex-fill text-end">
                                        <div class="card-price">
                                            6.950.000₫
                                        </div>
                                        <div class="card-clear">
                                            <button class="link-default buttonDelete">Xóa</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                const listProduct = $('#cardList');

                listProduct.append(htmlProduct)

                body.addClass('is-cart');
                floatingCart.addClass('is-product');
                handleDeleteProductCart();
            }
        }

        /***
         * Xử lý nút thêm sản phẩm vào giỏ hàng
         */
        const handleAddProductCart = function () {
            const buttonAdds = $('.buttonCart');
            if (buttonAdds.length) {
                buttonAdds.click(function () {
                    handleToggleCart(true);
                })
            }
        }


        /***
         * Xử lý nút xóa sản phẩm khỏi giỏ hàng
         */
        const handleDeleteProductCart = function () {
            const buttonDeletes = $('.buttonDelete');
            buttonDeletes.click(function () {
                const buttonDelete = $(this);
                const itemProduct = buttonDelete.closest('.card-item');
                itemProduct.fadeOut(function () {
                    itemProduct.remove();

                    if (floatingCart.find('#cardList .card-item').length === 0) {
                        floatingCart.removeClass('is-product');
                    }
                });
            })
        }

        /***
         * Gọi function
         */
        handleToggleCart();
        handleAddProductCart();
    }
}

const handleSliderHero = function () {
    if ($('#slider-hero').length) {
        new Swiper('#slider-hero .swiper', {
            speed: 500,
            slidesPerView: 1,
            preloadImages: false,
            effect: 'fade',
            loop: true,
            autoplay: {
                delay: 8000,
                disableOnInteraction: false,
            },
            pagination: {
                el: "#slider-hero .slider-pagination",
                clickable: true
            },
        });
    }
}

const handleSliderCategory = function () {
    if ($('#slider-category').length) {
        new Swiper('#slider-category .swiper', {
            speed: 1000,
            slidesPerView: 4,
            preloadImages: false,
            spaceBetween: 16,
            breakpoints: {
                320: {
                    slidesPerView: 1.25,
                    spaceBetween: 10,
                    grid: {
                        rows: 2,
                        fill: "row",
                    },
                },
                525: {
                    slidesPerView: 2.25,
                    spaceBetween: 10,
                    grid: {
                        rows: 2,
                        fill: "row",
                    },
                },
                991: {
                    slidesPerView: 3.25,
                    spaceBetween: 10,
                    grid: {
                        rows: 2,
                        fill: "row",
                    },
                },
                1200: {
                    slidesPerView: 4,
                }
            },
        });
    }
}

const handleSliderTabsProduct = function () {
    if ($('.slider-tabs').length) {
        $('.slider-tabs').each(function () {
            const sliderItem = '#' + $(this).attr('id');

            new Swiper(sliderItem + ' .swiper', {
                speed: 1000,
                slidesPerView: 4,
                preloadImages: false,
                spaceBetween: 16,
                breakpoints: {
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                        grid: {
                            rows: 2,
                            fill: "row",
                        },
                    },
                    991: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                        grid: {
                            rows: 2,
                            fill: "row",
                        },
                    },
                    1200: {
                        slidesPerView: 4,
                        grid: {
                            rows: 1,
                            fill: "column",
                        },
                    }
                },
                navigation: {
                    nextEl: sliderItem + " .slider-button_next",
                    prevEl: sliderItem + " .slider-button_prev",
                },
            });
        });
    }
}

const handleSliderIntroduction = function () {
    if ($('#slider-introduction').length) {
        new Swiper('#slider-introduction .swiper', {
            speed: 1000,
            slidesPerView: 4,
            preloadImages: false,
            spaceBetween: 16,
            breakpoints: {
                320: {
                    slidesPerView: 1.25,
                    spaceBetween: 16,
                },
                768: {
                    slidesPerView: 2.25,
                    spaceBetween: 16,
                },
                991: {
                    slidesPerView: 3.25,
                    spaceBetween: 16,
                },
                1200: {
                    slidesPerView: 4,
                }
            },
        });
    }
}

const handleSliderImagesProduct = function () {
    const handleFancyBoxProduct = function (elm, initSliderAvatar, initSliderThumb) {
        let i = 0;
        elm.click(function () {
            i = 0;
        });

        Fancybox.bind(('[data-fancybox=detailGallery]'), {
            touch: true,
            beforeShow: function (instance, current) {
                let index = elm.find(`[data-fancybox='detailGallery'][href='${current.src}']`).attr('data-index');
                initSliderAvatar.slideTo(index - 1);
                if (typeof initSliderThumb !== 'undefined') {
                    initSliderThumb.slideTo(index - 1);
                }
            },
        });
    }

    let sliderAvatar = $('#product-avatar');
    let sliderThumb = $('#product-thumb');

    if (sliderAvatar.length > 0) {
        let initSliderThumb;
        if (sliderThumb.length) {
            initSliderThumb = new Swiper('#product-thumb .swiper', {
                loop: false,
                speed: 1000,
                slidesPerView: 3,
                spaceBetween: 12,
                breakpoints: {
                    320: {
                        slidesPerView: 3.5,
                    },
                    768: {
                        slidesPerView: 4.5,
                    },
                    1199: {
                        slidesPerView: 5,
                    }
                },
                autoplay: false,
            });
        }

        let initSliderAvatar = new Swiper('#product-avatar .swiper', {
            loop: false,
            speed: 1000,
            autoplay: {
                delay: 8000,
                disableOnInteraction: true,
            },
            slidesPerView: 1,
            thumbs: {
                swiper: initSliderThumb,
            },
            navigation: {
                nextEl: "#product-avatar .slider-button_next",
                prevEl: "#product-avatar .slider-button_prev",
            },
        });

        handleFancyBoxProduct(sliderAvatar, initSliderAvatar, initSliderThumb);
    }
}

const handleSliderProductRelated = function () {
    if ($('#slider-productRelated').length) {
        new Swiper('#slider-productRelated .swiper', {
            speed: 1000,
            slidesPerView: 4,
            preloadImages: false,
            spaceBetween: 16,
            breakpoints: {
                320: {
                    slidesPerView: 1.5,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2.5,
                    spaceBetween: 10,
                },
                991: {
                    slidesPerView: 3.5,
                    spaceBetween: 10,
                },
                1200: {
                    slidesPerView: 4,
                }
            },
            navigation: {
                nextEl: "#slider-productRelated .slider-button_next",
                prevEl: "#slider-productRelated .slider-button_prev",
            },
        });
    }
}

const handleSliderArticleRelated = function () {
    if ($('#slider-articleRelated').length) {
        new Swiper('#slider-articleRelated .swiper', {
            speed: 1000,
            slidesPerView: 4,
            preloadImages: false,
            spaceBetween: 16,
            breakpoints: {
                320: {
                    slidesPerView: 1.25,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2.5,
                    spaceBetween: 10,
                },
                991: {
                    slidesPerView: 3.5,
                    spaceBetween: 10,
                },
                1200: {
                    slidesPerView: 4,
                }
            },
            navigation: {
                nextEl: "#slider-articleRelated .slider-button_next",
                prevEl: "#slider-articleRelated .slider-button_prev",
            },
        });
    }
}

const handleDetailContent = function () {
    if ($('.detail-content').length) {
        $('.detail-content').each(function () {
            if ($(this).find('img').length > 0) {
                $(this).find('img').each((index, elm) => {
                    $(elm).wrap(`<a style="cursor: zoom-in" href="${$(elm).attr("src")}" data-caption="${$(elm).attr("alt")}" data-fancybox="article-detail"></a>`);
                });

                Fancybox.bind(`[data-fancybox=article-detail]`, {
                    thumbs: {
                        autoStart: true,
                    },
                });
            }

            if ($(this).find('table').length > 0) {
                $(this).find('table').map(function () {
                    $(this).addClass('table table-bordered');
                    $(this).wrap('<div class="table-responsive"></div>');
                })
            }
        })
    }
}

const handleSliderPartner = function () {
    if ($('#slider-partner').length) {
        new Swiper('#slider-partner .swiper', {
            speed: 500,
            slidesPerView: 6,
            preloadImages: false,
            spaceBetween: 24,
            loop: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            pagination: {
                el: "#slider-partner .slider-pagination",
                clickable: true
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                375: {
                    slidesPerView: 2.5,
                },
                768: {
                    slidesPerView: 3.5,
                },
                991: {
                    slidesPerView: 4.5,
                },
                1200: {
                    slidesPerView: 6,
                }
            },
        });
    }
}

$(function () {
    handleApplyCollapse($('#header-navigation > ul'), true, true);
    handleCallMenu();
    $(window).resize(function () {
        handleApplyCollapse($('#header-navigation > ul'));
        handleCallMenu();
    });
    handleStickHeader();
    handleCategoryBar();
    handleCategoryMobile();
    handleCart();
    handleSliderHero();
    handleSliderCategory();
    handleSliderTabsProduct();
    handleSliderIntroduction();
    handleSliderImagesProduct();
    handleSliderProductRelated();
    handleDetailContent();
    handleSliderArticleRelated();
    handleSliderPartner();
});
