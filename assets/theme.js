var xxx, xxx1, yyy;
NProgress.start(), jQuery(window).resize(function() {
    768 > roar.getWidthBrowser() && $("#popup-mailchimp.hidden-xs").find(".mfp-close").trigger("click")
}), jQuery(document).ready(function() {
    try {
        roar.initLazyLoading(), roar.init(), roarLookbook.init(), theme.CurrencyPicker.init(), theme.LanguagePicker.init()
    } finally {
        NProgress.done()
    }
}), jQuery(window).load(function() {
    roar.initLazyLoading(), setTimeout(function() {
        roar.handleSeasonalFrame()
    }, 3e3)
});
var roar = {
        init: function() {
            this.handleAccount(), this.handleCartAgree(), this.handleAddress(), this.initProductQuickShopItem(), this.initFilterSidebar(), this.initFooterCollapse(), this.initVerticalMenuSidebar(), this.initChangeInputNameCartPage(), this.handleOrder(), this.initCountdown(), this.addToCart(), this.cartSidebar(), this.removeCart(), this.addToWishlist(), this.handleCompare(), this.removeToWishlist(), this.handlePopups(), this.handleSearch(), this.handleGMap(), this.handleScrollToTop(), this.handleSmoothScroll(), this.mapFilters(), this.handleQuickshop(), this.handleBlog(), this.handleCookie(), this.fixedHeaderMenu(), this.searchAutoComplete(), this.handleDropdown(), this.toggleFilter(), this.handleInstagramFloatBar()
        },
        handleSeasonalFrame: function() {
            jQuery(window).resize(function() {
                if (0 < $(".rt-seasonal-frames").length) {
                    var e = !1;
                    if (!1 == $(".rt-seasonal-frames").data("mobile") && 768 < roar.getWidthBrowser() && (e = !0), !0 == $(".rt-seasonal-frames").data("mobile") && (e = !0), !0 == e) {
                        $(".rt-seasonal-frames").show();
                        for (var t = $(".rt-seasonal-frames"), a = t.data("ow"), o = t.data("oh"), r = 0; r < t.children().length; r++) {
                            var n, s, l, d, c = $(t.children()[r]),
                                p = c.data("position"),
                                u = c.data("idx"),
                                m = c.data("w"),
                                h = c.data("h"),
                                g = c.data("x"),
                                f = c.data("y"),
                                v = c.data("src"),
                                y = 1e3 + u;
                            "top" == p || "bottom" == p ? (n = window.innerWidth / a, s = m * n, _newHeight = h * n, l = g * n, d = "top" == p ? f * n : (o - f - h) * n, c.html(""), c.html("<img width=\"" + s + "\" height=\"" + _newHeight + "\" style=\"z-index:" + y + ";left:" + l + "px;" + p + ":" + d + "px\" src=\"" + v + "\"/>")) : (n = window.innerHeight / o, s = m * n, _newHeight = h * n, d = f * n, l = "left" == p ? g * n : (a - g - m) * n, c.html(""), c.html("<img width=\"" + s + "\" height=\"" + _newHeight + "\" style=\"z-index:" + y + ";top:" + d + "px;" + p + ":" + l + "px\" src=\"" + v + "\"/>"))
                        }
                    } else $(".rt-seasonal-frames").hide()
                }
            }).resize()
        },
        handleCartAgree: function() {
            $("body").on("change", ".product-cart__agree", function() {
                var e = $(this),
                    t = $(this).closest(".cart__condition__wrapper").find(".checkout-button");
                e.is(":checked") ? t.removeClass("btn-disabled") : t.addClass("btn-disabled")
            })
        },
        handleAddress: function() {
            var e = $("#AddressNewForm");
            e.length && (Shopify && new Shopify.CountryProvinceSelector("AddressCountryNew", "AddressProvinceNew", {
                hideElement: "AddressProvinceContainerNew"
            }), $(".address-country-option").each(function() {
                var e = $(this).data("form-id");
                new Shopify.CountryProvinceSelector("AddressCountry_" + e, "AddressProvince_" + e, {
                    hideElement: "AddressProvinceContainer_" + e
                })
            }), $(".address-new-toggle").on("click", function() {
                e.toggleClass("hide")
            }), $(".address-edit-toggle").on("click", function() {
                var e = $(this).data("form-id");
                $("#EditAddress_" + e).toggleClass("hide")
            }), $(".address-delete").on("click", function() {
                var e = $(this),
                    t = e.data("form-id"),
                    a = e.data("confirm-message");
                confirm(a || "Are you sure you wish to delete this address?") && Shopify.postLink("/account/addresses/" + t, {
                    parameters: {
                        _method: "delete"
                    }
                })
            }))
        },
        handleAccount: function() {
            function e() {
                return $("#recover-password").fadeIn(), $("#customer-login").hide(), window.location.hash = "#recover", !1
            }

            function t() {
                return $("#recover-password").hide(), $("#customer-login").fadeIn(), window.location.hash = "", !1
            }
            $("#forgot_password a").click(function() {
                e()
            }), "#recover" == window.location.hash ? e() : t(), $("#recover-password .cancel").click(function() {
                t()
            })
        },
        // handleHeaderNotice: function() {
            
        // },
        handleInstagramFloatBar: function() {
            if (window.social_instagram) {
                var e = new Instafeed({
                    get: "user",
                    target: "instagram_list",
                    accessToken: $("#instagram_list").data("token"),
                    userId: $("#instagram_list").data("uid"),
                    limit: $("#instagram_list").data("limit"),
                    resolution: "thumbnail",
                    resolution2: "standard_resolution",
                    template: "<a target=\"_blank\" href=\"{{link}}\"><img src=\"{{image}}\" alt=\"{{caption}}\" width=\"150\" height=\"150\" /></a>"
                });
                e.run()
            }
        },
        initLazyLoading: function(e, t) {
            var e = e || "body",
                t = t || !1,
                a = new Blazy({
                    selector: e + " .b-lazy",
                    success: function(e) {
                        setTimeout(function() {
                            var t = e.parentNode;
                            t.className = t.className.replace(/\bb-loading\b/, "")
                        }, 200)
                    }
                });
            !0 == t && a.load($(e + " .b-lazy"), !0)
        },
        initProductQuickShopItem: function(e) {
            function t(t) {
                return (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
            }

            function a(t) {
                return t.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
            }

            function o(e) {
                var t = e.replace("https:", "").replace("http:", "").split("?v=")[0].split("/"),
                    a = t[t.length - 1].split("."),
                    o = a.pop(),
                    r = a.join(".") + "_100x." + o;
                return e.replace(t[t.length - 1], r)
            }

            function r(e, t) {
                var a = e.replace("https:", "").replace("http:", "").split("?v=")[0].split("/"),
                    o = a[a.length - 1].split("."),
                    r = o.pop(),
                    n = o.join(".") + t + "@2x." + r,
                    s = o.join(".") + t + "." + r,
                    l = {};
                return l.srcset = e.replace(a[a.length - 1], n) + " 500w," + e.replace(a[a.length - 1], s) + " 166w", l.src = e.replace(a[a.length - 1], s), l
            }

            function n(e, t) {
                var a = t.replace("https:", "").replace("http:", "").split("?v=")[0],
                    o = "";
                0 < e.find(".item-images-wrapper a").length && e.find(".item-images-wrapper a").each(function() {
                    var e = $(this).data("_image").replace("https:", "").replace("http:", "").split("?v=")[0];
                    if (e == a) return void(o = $(this))
                }), e.find(".item-images-wrapper a").removeClass("active"), "" != o && o.addClass("active")
            }

            function s(t, a, e, o) {
                if (1 < a.options.length)
                    for (i = 0; i < a.options.length; i++) i != e && $("#single-option-selector-" + a.id + "-" + i + "-" + t + " option").each(function() {
                        var r = $(this).closest(".product-item-advanced-wrapper"),
                            n = "unavailable",
                            s = $(this).attr("value");
                        for (j = 0; j < a.variants.length; j++) {
                            var l = a.variants[j];
                            if (l.options[e] != o) continue;
                            else if (l.options[i] == s) {
                                n = !0 == l.available ? "available" : "sold_out";
                                break
                            }
                        }
                        var d = r.find(".variations-content-" + a.id + " #swatch-" + i + "-" + s.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-") + "-" + t);
                        $(d).closest(".swatch-element").removeClass("available").removeClass("sold_out").removeClass("unavailable").addClass(n)
                    });
                else
                    for (i = 0; i < a.options.length; i++) $("#single-option-selector-" + a.id + "-" + i + "-" + t + " option").each(function() {
                        var e = $(this).closest(".product-item-advanced-wrapper"),
                            o = "unavailable",
                            r = $(this).attr("value");
                        for (j = 0; j < a.variants.length; j++)
                            if (a.variants[j].options[i] == r) {
                                o = a.variants[j].available ? "available" : "sold_out";
                                break
                            } var n = e.find(".variations-content-" + a.id + " #swatch-" + i + "-" + r.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-") + "-" + t);
                        $(n).closest(".swatch-element").removeClass("available").removeClass("sold_out").removeClass("unavailable").addClass(o)
                    })
            }

            function l(e) {
                var t, a = e,
                    o = [],
                    r = a.get(0).attributes,
                    n = r.length;
                for (t = 0; t < n; t++) "data-" === r[t].name.substring(0, 5) && o.push(r[t].name);
                $.each(o, function(e, t) {
                    a.removeAttr(t)
                })
            }

            function d(e, t) {
                if (t.available ? (e.find("div.price").data("price", t.price), e.find(".btn-action.addtocart-item-js span").text(theme.strings.addToCart), e.find(".btn-action.addtocart-item-js").prop("disabled", !1)) : (e.find("div.price").data("price", "0"), e.find(".btn-action.addtocart-item-js span").text(theme.strings.soldOut), e.find(".btn-action.addtocart-item-js").prop("disabled", !0)), 0 < e.closest(".grouped-product").length && roar.updateGroupedPrice(), e.find("select.variation-select.no-js").val(t.id), e.find("span.price-new.money").html(theme.Currency.formatMoney(t.price, theme.settings.moneyFormat)), !(t.compare_at_price > t.price)) e.find("span.price-old.money").addClass("hide"), e.find(".sale").addClass("hide");
                else if (e.find("span.price-old.money").html(theme.Currency.formatMoney(t.compare_at_price, theme.settings.moneyFormat)).removeClass("hide"), e.find(".sale").text(theme.strings.sale).removeClass("hide"), e.find(".sale").hasClass("percentage")) {
                    var a = Math.round(100 * (t.compare_at_price - t.price) / t.compare_at_price);
                    e.find(".sale").text("-" + a + "%")
                }
                if (window.show_multiple_currencies && (l(e.find(".money")), theme.CurrencyPicker.convert(".product-item-advanced-wrapper .money")), null !== t.featured_image) {
                    n(e, t.featured_image.src);
                    var o = r(t.featured_image.src, e.data("_dim"));
                    e.find("img.mpt-image").attr("srcset", o.srcset).attr("src", o.src)
                }
            }
            var e = e || "body",
                c = $(e).find(".single-option-selector-item");
            0 < c.length && c.unbind("change") && c.on("change", function() {
                var e = $(this).closest(".product-item-advanced-wrapper");
                if (0 < $(e.find(".product-item-option").data("id")).length) {
                    var t = JSON.parse($(e.find(".product-item-option").data("id")).html()),
                        a = {},
                        o = "not_found";
                    for ($(this).closest(".variations-content").find(".single-option-selector-item").each(function() {
                            a[$(this).data("index")] = $(this).val()
                        }), k = 0; k < t.variants.length; k++) {
                        var r = !1;
                        for (ol = 1; ol <= t.options.length; ol++)
                            if (a["option" + ol] == t.variants[k]["option" + ol]) r = !0;
                            else {
                                r = !1;
                                break
                            } if (!0 == r) {
                            o = "found", d(e, t.variants[k]);
                            break
                        }
                    }
                    "not_found" == o && (e.find(".btn-action.addtocart-item-js span").text(theme.strings.unavailable), e.closest(".product-item-advanced-wrapper").find(".btn-action.addtocart-item-js").prop("disabled", !0))
                }
            });
            var p = $(e).find(".product-item-option");
            if (0 < p.length) {
                var u = 0,
                    v = {};
                p.each(function() {
                    if (!$(this).hasClass("has-swatch-finished")) {
                        ++u;
                        var p = $(this).closest(".product-item-advanced-wrapper").addClass("product-item-advanced-wrapper-" + u);
                        if ($(this).find(".single-option-selector-item").each(function() {
                                var e = $(this).data("id") + "-" + u;
                                $(this).attr("id", e), $(this).data("_index", u)
                            }), 0 < $($(this).data("id")).length) {
                            var y = JSON.parse($($(this).data("id")).html());
                            0 < $($(this).data("swatch_id")).length && (v = JSON.parse($($(this).data("swatch_id")).html()));
                            var e = [];
                            if ("1" == window.swatch_size && e.push("Size"), e.push("size"), "1" == window.swatch_color && (e.push("Color"), e.push("Colour"), e.push("color"), e.push("colour")), 0 < e.length) {
                                var b = !1,
                                    w = !1,
                                    C = 0,
                                    x = theme.asset_url.substring(0, theme.asset_url.lastIndexOf("?")),
                                    S = theme.asset_url.substring(theme.asset_url.lastIndexOf("?"), theme.asset_url.length);
                                for (i = 0; i < y.options.length; i++) {
                                    var c = "",
                                        T = "",
                                        P = "",
                                        I = "",
                                        A = "",
                                        z = "",
                                        N = "",
                                        L = "img btooltip";
                                    if (c = "object" == typeof y.options[i] ? y.options[i].name : y.options[i], b = !1, w = !1, -1 < e.indexOf(c)) {
                                        b = !0, C = i;
                                        var M = c.toLowerCase();
                                        if (/color|colour/i.test(M) && (w = !0), b) {
                                            var d = [];
                                            for (j = 0; j < y.variants.length; j++) {
                                                var m = y.variants[j],
                                                    h = t(m.options[C]),
                                                    f = a(h);
                                                0 > d.indexOf(h) && ("color" != M && "colour" != M ? (N = h, L = "btooltip") : "1" == window.swatch_color_advanced ? null !== v[f] && void 0 !== v[f] && "" != v[f] ? (L = "img btooltip swatch_color_advanced", N = "<i style=\"background-image: url(" + x + v[f] + ".png" + S + ")\"></i>") : null === m.featured_image ? N = "<i style=\"background-color:" + h + "; background-image: url(" + x + f + ".png" + S + ")\"></i>" : (L = "img btooltip swatch_color_advanced", N = "<i style=\"background-image: url(" + o(m.featured_image.src) + ")\"></i>") : N = "<i style=\"background-color:" + h + "; background-image: url(" + x + f + ".png" + S + ")\"></i>", z = $("#single-option-selector-" + y.id + "-" + C + "-" + u).val() == h ? "selected " : "", P = P + "<div class=\"swatch-element " + M + f + " available\"><input data-id=\"#single-option-selector-" + y.id + "-" + C + "-" + u + "\" data-value=\"" + h + "\"  class=\"swatch-radio " + z + "\" id=\"swatch-single-option-selector-" + y.id + "-" + C + "-" + f + "-" + u + "\" type=\"radio\" data-swatch=\"" + M + "\" data-poption=\"" + C + "\" name=\"option-" + C + "\" value=\"" + h + "\"><label for=\"swatch-single-option-selector-" + y.id + "-" + C + "-" + f + "-" + u + "\" class=\"" + L + "\" title=\"" + h + "\"><span class=\"soldout-image\"></span>" + N + "</label></div>", d.push(h))
                                            }
                                            T = "<div class=\"wrapper-swatches-product-item wrapper-swatches swatch " + M + "\" data-attribute_name=\"attribute_pa_" + M + "\"><div>" + P + "</div></div>", I = p.find("#single-option-selector-" + y.id + "-" + C + "-" + u), A = p.find("#single-option-selector-" + y.id + "-" + C + "-" + u), "" != T && (I.after(T), I.hide(), A.addClass("hide-choose-option"))
                                        }
                                    }
                                }
                            }
                            var g = "";
                            0 < p.find(".wrapper-swatches-product-item").length && (g = p.find(".wrapper-swatches-product-item .swatch-radio"), g.unbind("click"), g.on("click", function() {
                                var e = $(this).closest(".product-item-advanced-wrapper"),
                                    t = e.find($(this).data("id")),
                                    a = $(this).data("poption"),
                                    o = $(this).data("value");
                                $(this).data("value") != t.val() && (t.val($(this).data("value")).trigger("change"), t.closest(".selector-wrapper").find(".swatch-radio").removeClass("selected"), $(this).addClass("selected")), s(t.data("_index"), y, a, o)
                            })), $(".swatch-radio.selected").trigger("click")
                        }
                        $(this).addClass("has-swatch-finished")
                    }
                })
            }
            $(document).on("mouseenter mouseleave click", ".product-item-advanced-wrapper:not(.ag-column-content.col-sm-3 .product-item-advanced-wrapper):not(.ag-column-content.col-sm-4 .product-item-advanced-wrapper)", function(r) {
                var t = $(this),
                    e = window.innerWidth,
                    o = t.find(".product-item-content"),
                    n = t.find(".product-item-inside-hover"),
                    l = parseInt(n.height()) + parseInt(n.css("marginTop")) + 3,
                    s = t.find(".count_holder_item .is-countdown"),
                    a = t.find(".count_holder_item .is-countdown").innerHeight(),
                    d = t.find(".item-images-wrapper"),
                    c = t.find(".item-images-wrapper").innerHeight();
                a += c, r.target, "mouseenter" === r.type && 1024 < e ? (t.css({
                    height: "100%"
                }).addClass("hovered"), o.css("transform", "translateY(-" + l + "px)"), n.css("opacity", "1"), s.css("transform", "translateY(-" + parseInt(l + 10) + "px)"), d.css("transform", "translateY(-" + parseInt(l) + "px)")) : "mouseleave" === r.type && r.relatedTarget && 1024 < e && (t.removeClass("hovered").removeAttr("style"), o.removeAttr("style"), n.removeAttr("style"), s.removeAttr("style"), d.removeAttr("style"))
            }), 0 < $(".item-images-wrapper").length && $(".item-images-wrapper a").on("click", function() {
                if (!$(this).hasClass("active")) {
                    var e = $(this).data("_image"),
                        t = $(this).data("_dim"),
                        a = r(e, t);
                    $(this).closest(".item-images-wrapper").find("a").removeClass("active"), $(this).addClass("active"), $(this).closest(".product-content-wrapper").find("img.mpt-image").attr("srcset", a.srcset).attr("src", a.src)
                }
            }), $(".items-image-buttons a").on("click", function(t) {
                t.preventDefault(), $(this).hasClass("next") ? $(this).closest(".product").find(".item-images-wrapper a.active").next().trigger("click") : $(this).closest(".product").find(".item-images-wrapper a.active").prev().trigger("click")
            })
        },
        initFilterSidebar: function() {
            $(".filter_title .arrow").click(function() {
                $(this).toggleClass("rotArr"), $(this).parent().next().slideToggle(300)
            })
        },
        initFooterCollapse: function() {
            $(".footer-accordion-heading").on("click", function(t) {
                t.preventDefault();
                var e = $(this).closest(".footer-accordion").find(".footer-accordion-content"),
                    a = $(this).find("i.fa");
                a.hasClass("aDown") ? a.removeClass("aDown") && e.slideUp() : a.addClass("aDown") && e.slideDown()
            })
        },
        initVerticalMenuSidebar: function() {
            $(".ver-dropdown-parent-submenu a.dropdown-link").on("click", function(t) {
                t.preventDefault();
                var e = $(this).closest(".ver-dropdown-parent-submenu").find("ul.ver-dropdown-menu"),
                    a = $(this).find("i.fa");
                a.hasClass("aDown") ? a.removeClass("aDown") && e.slideUp() : a.addClass("aDown") && e.slideDown()
            })
        },
        changeInputNameCartPage: function() {
            767 < $(window).width() ? ($(".input-mobile").attr("name", ""), $(".input-desktop").attr("name", "updates[]")) : ($(".input-mobile").attr("name", "updates[]"), $(".input-desktop").attr("name", ""))
        },
        initChangeInputNameCartPage: function() {
            $(".input-mobile").length && $(".input-desktop").length && (roar.changeInputNameCartPage(), $(window).resize(function() {
                roar.changeInputNameCartPage()
            }))
        },
        fixedHeaderMenu: function() {
            if (!(991 >= $(window).width())) {
                if (0 < $("#header-phantom").length && $("#header-phantom").remove(), 0 < $(".section-megamenu-content").length && $(".section-megamenu-content").each(function() {
                        var t = $(this).data("menu_width_class");
                        0 < $(this).closest(".shopify-section").length && ($(this).closest(".shopify-section").hasClass(t) || $(this).closest(".shopify-section").addClass(t))
                    }), "menu" == window.fixed_header) {
                    var t = $("<div id=\"header-phantom\" class=\"fixed-header-1 sticky-header\"></div>");
                    t.insertAfter(".megamenu-background"), $(".megamenu-background").clone().appendTo("#header-phantom"), roar.fixedMenu(), $(window).resize(function() {
                        roar.fixedMenu()
                    }), $(window).scroll(function() {
                        roar.fixedMenu()
                    })
                } else if ("header" == window.fixed_header) {
                    var t = $("<div id=\"header-phantom\" class=\"fixed-header-1 sticky-header\"></div>");
                    t.insertAfter("#top"), $("#top").clone().appendTo("#header-phantom"), roar.fixedHeader(), $(window).resize(function() {
                        roar.fixedHeader()
                    }), $(window).scroll(function() {
                        roar.fixedHeader()
                    })
                }
                0 < $("#header-phantom .shopify-section").length && $("#header-phantom .shopify-section").each(function() {
                    $(this).removeClass("shopify-section")
                })
            }
        },
        fixedHeader: function() {
            var t = $("header #top").first().width();
            $("header #top .background").first().width() != $("header").first().width() && $(".sticky-header").css("background", "none"), $(".sticky-header").css("width", t).css("left", "50%").css("right", "auto").css("margin-left", "-" + Math.ceil(t / 2) + "px").css("margin-right", "-" + Math.ceil(t / 2) + "px"), 1160 <= roar.getWidthBrowser() && 280 < $(window).scrollTop() ? $(".sticky-header").addClass("fixed-header") : $(".sticky-header").removeClass("fixed-header")
        },
        fixedMenu: function() {
            var t = $("header .megamenu-background").first().width();
            $("header #top .background").first().width() != $("header").first().width() && $(".sticky-header").css("background", "none"), $(".sticky-header").css("width", t).css("left", "50%").css("right", "auto").css("margin-left", "-" + Math.ceil(t / 2) + "px").css("margin-right", "-" + Math.ceil(t / 2) + "px"), 1160 <= roar.getWidthBrowser() && 280 < $(window).scrollTop() ? $(".sticky-header").addClass("fixed-header") : $(".sticky-header").removeClass("fixed-header")
        },
        toggleFilter: function() {
            $("#filter-sidebar").on("click", function() {
                $("body").toggleClass("open_filter")
            }), $(document).on("click", ".open_filter .spinner", function() {
                $("body").removeClass("open_filter")
            }), $("#filter-addtocart").on("click", function() {
                $("#product .add-to-cart").trigger("click")
            })
        },
        searchAutoComplete: function() {
            var s = null;
            $("form[action=\"/search\"]").each(function() {
                var e = "product",
                    r = $(this).find("select[name=\"category_id\"]"),
                    o = $(this).find("input[name=\"type\"]");
                0 < r.length && 0 < o.length && $(r).bind("change", function() {
                    $(o).val($(this).val()), e = $(this).val()
                });
                var l = $(this).find("input[name=\"q\"]");
                $("<ul class=\"ui-autocomplete ui-front\"></ul>").appendTo($(this).find(".autocomplete-results")).hide(), l.attr("autocomplete", "off").bind("keyup change", function() {
                    var t = $(this).val(),
                        o = $(this).closest("form"),
                        a = "/search?type=" + e + "&q=*" + t + "*",
                        n = o.find(".ui-autocomplete");
                    3 <= t.length && t != $(this).attr("data-old-term") && (l.addClass("ui-autocomplete-loading"), $(this).attr("data-old-term", t), null != s && s.abort(), s = $.getJSON(a + "&view=json", function(t) {
                        l.removeClass("ui-autocomplete-loading"), n.empty(), 0 == t.results_count ? n.hide() : ($.each(t.results, function(a, e) {
                            var t = $("<a></a>").attr("href", e.url);
                            t.append("<span class=\"thumbnail\"><img src=\"" + e.thumbnail + "\" /></span>"), t.append("<span class=\"title\">" + e.title + "</span>"), t.wrap("<li></li>"), n.append(t.parent())
                        }), 1 < t.results_count && n.append("<li><span class=\"title\"><a href=\"" + a + "\">" + window.all_results_text + " (" + t.results_count + ")</a></span></li>"), n.fadeIn(200))
                    }))
                })
            }), $("body").bind("click", function() {
                $(".ui-autocomplete").hide()
            })
        },
        destroyCountdown: function() {
            $.fn.countdown && $(".is-countdown").countdown("destroy")
        },
        initCountdown: function() {
            $.fn.countdown && $(".countdown:not(.is-countdown)").each(function() {
                var a = $(this),
                    e = new Date,
                    t = new Date(parseInt(a.data("year")), parseInt(a.data("month")) - 1, a.data("day"));
                t > e ? a.countdown({
                    until: t
                }) : a.parent().hide()
            })
        },
        handleCookie: function() {
            function e() {
                try {
                    var t = "domain=." + document.domain,
                        e = new Date;
                    e.setTime(e.getTime() + 31536e6);
                    var a = "; expires=" + e.toGMTString();
                    document.cookie = "popup-module-cookie=true" + a + "; path=/; " + t
                } catch (t) {
                    console.log(t.message)
                }
            }

            function t() {
                try {
                    if (0 < document.cookie.length) {
                        var e = document.cookie.indexOf("popup-module-cookie=");
                        if (-1 != e) {
                            e = e + "popup-module-cookie".length + 1;
                            var a = document.cookie.indexOf(";", e);
                            return -1 == a && (a = document.cookie.length), unescape(document.cookie.substring(e, a))
                        }
                    }
                } catch (t) {
                    console.log(t.message)
                }
            }!t() && $("#cookie").length && (function() {
                $("#cookie.cookie").length ? $("#cookie").fadeIn("slow") : $("#cookie.popup").length && $.magnificPopup.open({
                    items: {
                        src: "#cookie",
                        type: "inline"
                    },
                    tLoading: "",
                    mainClass: "popup-module mfp-with-zoom popup-type-2",
                    removalDelay: 200,
                    modal: !0
                })
            }(), $("#cookie .accept").click(function() {
                e(), $("#cookie.cookie").length ? $("#cookie").fadeOut("slow") : $("#cookie.popup").length && $.magnificPopup.close()
            }))
        },
        handleBlog: function() {
            function a(t) {
                $.ajax({
                    url: location.href,
                    type: "get",
                    dataType: "html",
                    data: {
                        page: t
                    },
                    success: function(t) {
                        "" != $(t).find(".blog-page .empty").html() && $(".pagination-ajax").hide()
                    },
                    error: function() {
                        $(".pagination-ajax").hide()
                    }
                })
            }

            function e() {
                t = $(".posts").masonry({
                    itemSelector: ".post"
                }), t.imagesLoaded().progress(function() {
                    t.masonry("layout")
                })
            }
            if ($("body").hasClass("templateBlog")) {
                var t = {};
                $(".posts").hasClass("posts-grid") && e(), $("#load-more").click(function() {
                    var e = $(this).attr("data-page");
                    $.ajax({
                        url: location.href,
                        type: "get",
                        dataType: "html",
                        data: {
                            page: e
                        },
                        beforeSend: function() {
                            $("#load-more").button("loading")
                        },
                        complete: function() {
                            $("#load-more").button("reset")
                        },
                        success: function(t) {
                            return "" == t ? void $(".pagination-ajax").fadeOut() : ($(".posts").hasClass("posts-grid") ? ($(".posts").append($(t).find(".posts").html()), $(".posts").masonry("reloadItems").masonry({
                                sortBy: "original-order"
                            }), setTimeout(function() {
                                $(".posts").masonry("reloadItems").masonry({
                                    sortBy: "original-order"
                                })
                            }, 500)) : $(".posts").append($(t).find(".posts").html()), $("#load-more").attr("data-page", parseInt(++e)), void a(e))
                        }
                    })
                })
            }
        },
        handleCompare: function() {
            "1" == window.compare && (roar.handleCompareEvent(), roar.autoloadCompare(), roar.handleCompareScroll())
        },
        handleCompareEvent: function() {
            var e = $("body"),
                t = $("a.add_to_compare");
            e.on("click", "a.add_to_compare", function() {
                var e = $(this),
                    t = e.data("pid"),
                    a = "",
                    o = RoarCookie.cookie.rtread("rt-compare");
                if (o = null != o && "" != o ? o.split(",") : [], 0 > o.indexOf(t) && !1 === $(this).hasClass("added")) {
                    o.push(t);
                    var r = o.join(",");
                    "," == r.substring(0, 1) && (r = r.substring(1)), RoarCookie.cookie.rtwrite("rt-compare", r)
                }!1 === $(this).hasClass("added") || "" === a ? (a = "", $.ajax({
                    url: "/search?view=compare&q=" + o,
                    dataType: "html",
                    type: "GET",
                    success: function(e) {
                        a = e
                    },
                    error: function() {
                        console.log("ajax error")
                    },
                    complete: function() {
                        $.magnificPopup.open({
                            items: {
                                src: a,
                                type: "inline"
                            },
                            preloader: !0,
                            tLoading: "",
                            mainClass: "quickview compareview",
                            removalDelay: 200,
                            gallery: {
                                enabled: !0
                            },
                            callbacks: {
                                open: function() {
                                    $("[data-pid=\"" + t + "\"]").addClass("added").attr("title", $("[data-pid=\"" + t + "\"]").attr("data-added")), $("[data-pid=\"" + t + "\"]").find("span").html($("[data-pid=\"" + t + "\"]").attr("data-add")), window.show_multiple_currencies && theme.CurrencyPicker.convert(".compare-content .money"), roar.handleReviews(), roar.handleCompareScroll()
                                }
                            }
                        })
                    }
                })) : $.ajax({
                    url: "/search?view=compare&q=" + o,
                    dataType: "html",
                    type: "GET",
                    success: function(e) {
                        a = e
                    },
                    error: function() {
                        console.log("ajax error")
                    },
                    complete: function() {
                        $.magnificPopup.open({
                            items: {
                                src: a,
                                type: "inline"
                            },
                            preloader: !0,
                            tLoading: "",
                            mainClass: "quickview compareview",
                            removalDelay: 200,
                            gallery: {
                                enabled: !0
                            },
                            callbacks: {
                                open: function() {
                                    window.show_multiple_currencies && theme.CurrencyPicker.convert(".compare-content .money"), roar.handleReviews(), roar.handleCompareScroll()
                                }
                            }
                        })
                    }
                })
            }), e.on("click", ".remove_from_compare", function(e) {
                e.preventDefault();
                var t = $(this),
                    a = t.attr("data-rev"),
                    o = $(".compare-content");
                $("[data-pid=\"" + a + "\"]").removeClass("added").attr("title", $("[data-pid=\"" + a + "\"]").attr("data-add")), $("[data-pid=\"" + a + "\"]").find("span").html($("[data-pid=\"" + a + "\"]").attr("data-add"));
                var r = decodeURI(RoarCookie.cookie.rtread("rt-compare"));
                null != r && (r = r.split(",")), r = jQuery.grep(r, function(e) {
                    return e != a
                }), r = $.trim(r), RoarCookie.cookie.rtwrite("rt-compare", r), $(".fastor_" + a).remove(), 0 >= r.length && $(".mfp-close").trigger("click")
            })
        },
        autoloadCompare: function() {
            if (0 != parseInt(theme.compare)) {
                var e = RoarCookie.cookie.rtread("rt-compare");
                null == e ? e = [] : (e = e.split(","), e.map(function(e) {
                    $("[data-pid=\"" + e + "\"]").addClass("added").attr("title", $("[data-pid=\"" + e + "\"]").attr("data-added")), $("[data-pid=\"" + e + "\"]").find("span").html($("[data-pid=\"" + e + "\"]").attr("data-added"))
                }))
            }
        },
        handleCompareScroll: function() {
            jQuery("#be_compare_features_table").on("scroll", function() {
                var e = jQuery(this).parent();
                jQuery(this).scrollLeft() + jQuery(this).innerWidth() >= jQuery(this)[0].scrollWidth ? e.hasClass("scroll-right") && e.removeClass("scroll-right") : 0 === jQuery(this).scrollLeft() ? e.hasClass("scroll-left") && e.removeClass("scroll-left") : (!e.hasClass("scroll-right") && e.addClass("scroll-right"), !e.hasClass("scroll-left") && e.addClass("scroll-left"))
            }), be_compare_container = document.getElementById("be_compare_features_table"), null !== be_compare_container && be_compare_container.offsetWidth < be_compare_container.scrollWidth && !jQuery("#be_compare_features_table_inner").hasClass("scroll-right") && jQuery("#be_compare_features_table_inner").addClass("scroll-right"), jQuery(window).on("resize", function() {
                roar.be_compare_products_table_shadows()
            }), jQuery("#be_compare_features_table_inner").hasClass("scroll-left") || jQuery("#be_compare_features_table_inner").hasClass("scroll-right") ? $(".compareview").addClass("no-flex") : $(".compareview").removeClass("no-flex")
        },
        be_compare_products_table_shadows: function() {
            be_compare_container = document.getElementById("be_compare_features_table");
            null === be_compare_container || (be_compare_container.offsetWidth < be_compare_container.scrollWidth ? !jQuery("#be_compare_features_table_inner").hasClass("scroll-right") && jQuery("#be_compare_features_table_inner").addClass("scroll-right") : (jQuery("#be_compare_features_table_inner").hasClass("scroll-right") && jQuery("#be_compare_features_table_inner").removeClass("scroll-right"), jQuery("#be_compare_features_table_inner").hasClass("scroll-left") && jQuery("#be_compare_features_table_inner").removeClass("scroll-left")), jQuery("#be_compare_features_table_inner").hasClass("scroll-left") || jQuery("#be_compare_features_table_inner").hasClass("scroll-right") ? $(".compareview").addClass("no-flex") : $(".compareview").removeClass("no-flex"))
        },
        removeToWishlist: function() {
            $(document).on("click", ".remove-wishlist", function(r) {
                r.preventDefault();
                var n = $(this),
                    e = n.closest("form"),
                    t = {
                        action: "remove_wishlist"
                    };
                return t = e.serialize() + "&" + $.param(t), $.ajax({
                    type: "POST",
                    url: "/a/wishlist",
                    async: !0,
                    cache: !1,
                    data: t,
                    dataType: "json",
                    beforeSend: function() {
                        $(".page-wishlist").addClass("is_loading")
                    },
                    error: function(t) {
                        console.log(t), $(".page-wishlist").removeClass("is_loading")
                    },
                    success: function(t) {
                        1 == t.code ? n.closest(".item").slideUp("fast", function() {
                            n.closest(".item").remove(), $(".page-wishlist .infos").removeClass("hide"), $(".wishlist_items_number").text(t.json), 0 == t.json && $(".wishlist-empty").removeClass("hide")
                        }) : (alert(t.json), console.log(t.json)), $(".page-wishlist").removeClass("is_loading")
                    }
                }), !1
            })
        },
        addToWishlist: function() {
            $(document).on("click", ".add-to-wishlist:not(.added)", function() {
                if ($(this).hasClass("need-login")) {
                    var e = $("#wishlist_error").html();
                    return $.notify({
                        message: e,
                        target: "_blank"
                    }, {
                        type: "info",
                        showProgressbar: !0,
                        z_index: 2031,
                        mouse_over: "pause",
                        placement: {
                            from: "top",
                            align: window.rtl ? "left" : "right"
                        }
                    }), !1
                }
                var r = $(this),
                    t = r.closest("form"),
                    a = {
                        action: "add_wishlist"
                    };
                return a = t.serialize() + "&" + $.param(a), $.ajax({
                    type: "POST",
                    url: "/a/wishlist",
                    async: !0,
                    cache: !1,
                    data: a,
                    dataType: "json",
                    beforeSend: function() {
                        r.hasClass("btooltip") ? r.addClass("loading") : r.attr("title", r.attr("data-loading-text")).find("span").text(r.attr("data-loading-text"))
                    },
                    complete: function() {
                        r.hasClass("btooltip") && r.removeClass("loading"), $(".wishlist" + r.prev().val()).attr("title", r.attr("data-added")).addClass("added").find("span").text(r.attr("data-added"))
                    },
                    error: function(a) {
                        var e = i = $.parseJSON(a.responseText),
                            t = e.message + ": " + e.description;
                        $.notify({
                            message: t,
                            target: "_blank"
                        }, {
                            type: "info",
                            showProgressbar: !0,
                            z_index: 2031,
                            mouse_over: "pause",
                            placement: {
                                from: "top",
                                align: window.rtl ? "left" : "right"
                            }
                        })
                    },
                    success: function() {
                        var a = r.closest(".product"),
                            e = [{
                                product_url: a.find(".name a").attr("href"),
                                product_name: a.find(".name a").text()
                            }];
                        $.notify({
                            message: $("<div>").append($("#wishlist_success").tmpl(e).clone()).html(),
                            target: "_blank"
                        }, {
                            type: "success",
                            showProgressbar: !0,
                            z_index: 2031,
                            mouse_over: "pause",
                            placement: {
                                from: "top",
                                align: window.rtl ? "left" : "right"
                            }
                        })
                    }
                }), !1
            })
        },
        addToCart: function() {
            "direct" != window.shopping_cart_type && $(document).on("click", ".add-to-cart:not(.disabled)", function() {
                var a = $(this),
                    e = a.closest("form");
                return $.ajax({
                    type: "POST",
                    url: "/cart/add.js",
                    async: !0,
                    cache: !1,
                    data: e.serialize(),
                    dataType: "json",
                    beforeSend: function() {
                        a.hasClass("btooltip") ? a.addClass("loading") : a.button("loading") && $("#filter-addtocart span").text(a.attr("data-loading-text")) && $("#filter-addtocart").addClass("active")
                    },
                    complete: function() {
                        a.hasClass("btooltip") ? a.removeClass("loading") : a.button("reset") && $("#filter-addtocart").removeClass("active")
                    },
                    error: function(t) {
                        roar.updateCart(t, !1)
                    },
                    success: function(t) {
                        "sidebar" == window.shopping_cart_type ? roar.updateCartSidebar(t, !0) : roar.updateCart(t, !0)
                    }
                }).done(function() {}), !1
            })
        },
        cartSidebar: function() {
            "sidebar" != window.shopping_cart_type || ($("body").on("click", ".cart-item a.remove-cart", function(e) {
                e.preventDefault();
                var t = $(this),
                    a = t.attr("data-id");
                $.ajax({
                    type: "POST",
                    url: "/cart/change.js",
                    data: "quantity=0&id=" + a,
                    dataType: "json",
                    beforeSend: function() {
                        $(".cart-window-body").addClass("loading")
                    },
                    success: function() {
                        $.ajax({
                            url: "/search",
                            beforeSend: function() {},
                            success: function() {
                                roar.updateCart(t, !0)
                            },
                            error: function(e) {
                                console.log(e)
                            }
                        }).done(function() {
                            $(".cart-window-body").removeClass("loading")
                        })
                    },
                    error: function(e, t) {
                        Shopify.onError(e, t), $(".cart-window-body").removeClass("loading")
                    }
                })
            }), $(document).on("focus", "#cart_info .update", function() {
                $(this).select()
            }).on("blur", "#cart_info .update", function() {
                var e = $(this),
                    t = e.val(),
                    a = e.attr("data-id");
                $.ajax({
                    type: "POST",
                    url: "/cart/change.js",
                    data: "quantity=" + t + "&id=" + a,
                    dataType: "json",
                    beforeSend: function() {
                        $(".cart-window-body").addClass("loading")
                    },
                    success: function() {
                        roar.updateCart(e, !0)
                    },
                    error: function(e, t) {
                        Shopify.onError(e, t)
                    }
                }).done(function() {
                    $(".cart-window-body").removeClass("loading")
                })
            }), $("body").on("click", ".cart-block-click", function(t) {
                //t.preventDefault();
                t.target !== this || $(".cart-window-bg").toggleClass("window-hide")
            }), $("body").on("click", ".close-cart", function(t) {
                t.preventDefault(), $(".cart-window-bg").addClass("window-hide")
            }), $("body").on("click", ".qty-btn.cart-plus", function() {
                var e = $(this).data("id"),
                    t = parseInt($(e).val()) + 1;
                $(e).val(t);
                var a = $(e),
                    o = a.val(),
                    r = a.attr("data-id");
                $.ajax({
                    type: "POST",
                    url: "/cart/change.js",
                    data: "quantity=" + o + "&id=" + r,
                    dataType: "json",
                    beforeSend: function() {
                        $(".cart-window-body").addClass("loading")
                    },
                    success: function() {
                        roar.updateCart(a, !0)
                    },
                    error: function(e, t) {
                        Shopify.onError(e, t)
                    }
                }).done(function() {
                    $(".cart-window-body").removeClass("loading")
                })
            }), $("body").on("click", ".qty-btn.cart-minus", function() {
                var e = $(this).data("id"),
                    t = parseInt($(e).val());
                if (1 < t) {
                    $(e).val(t - 1);
                    var a = $(e),
                        o = a.val(),
                        r = a.attr("data-id"),
                        n = {
                            type: "POST",
                            url: "/cart/change.js",
                            data: "quantity=" + o + "&id=" + r,
                            dataType: "json",
                            beforeSend: function() {
                                $(".cart-window-body").addClass("loading")
                            },
                            success: function() {
                                roar.updateCart(a, !0)
                            },
                            error: function(e, t) {
                                Shopify.onError(e, t)
                            }
                        };
                    $.ajax(n).done(function() {
                        $(".cart-window-body").removeClass("loading")
                    })
                }
            }))
        },
        updateCartSidebar: function() {
            $.ajax({
                url: "/search",
                beforeSend: function() {
                    $(".cart-window-body").addClass("loading")
                },
                success: function(e) {
                    0 < $("div#cart-sidebar").length && ($("div#cart-sidebar").html($(e).find("div#cart-sidebar").html()), setTimeout(function() {
                        $(".cart-block-click").trigger("click")
                    }, 100)), $("div#cart_block").html($(e).find("div#cart_block").html()), $("div#cart_popup").html($(e).find("div#cart_popup").html()), $(".mobile-nav-cart").html($(e).find(".mobile-nav-cart").html()), $("#filter-cart").html($(e).find("#filter-cart").html()), window.show_multiple_currencies && (theme.CurrencyPicker.convert("#cart_block .money"), theme.CurrencyPicker.convert("#cart_popup .money"), theme.CurrencyPicker.convert("#cart-sidebar .money")), roar.handleReviews()
                },
                error: function(e) {
                    console.log(e)
                }
            }).done(function() {
                $(".cart-window-body").removeClass("loading")
            })
        },
        updateCart: function(e, a) {
            if (!0 == a) "sidebar" == window.shopping_cart_type ? $.ajax({
                url: "/search",
                beforeSend: function() {
                    $(".cart-window-body").addClass("loading")
                },
                success: function(e) {
                    0 < $("#cart-sidebar").length && $("#cart-sidebar").html($(e).find("#cart-sidebar").html()), $("div#cart_block").html($(e).find("div#cart_block").html()), $("div#cart_popup").html($(e).find("div#cart_popup").html()), $(".mobile-nav-cart").html($(e).find(".mobile-nav-cart").html()), $("#filter-cart").html($(e).find("#filter-cart").html()), window.show_multiple_currencies && (theme.CurrencyPicker.convert("#cart_block .money"), theme.CurrencyPicker.convert("#cart_popup .money"), theme.CurrencyPicker.convert("#cart-sidebar .money")), roar.handleReviews()
                },
                error: function(e) {
                    console.log(e)
                }
            }).done(function() {
                $(".cart-window-body").removeClass("loading")
            }) : $.ajax({
                url: "/search?view=cart&q=" + e.handle + "_sp_" + e.variant_id + "_sp_" + e.quantity + "_sp_" + e.price,
                beforeSend: function() {},
                success: function(e) {
                    $("div#cart_block").html($(e).filter("div#cart_block").html()), $("div#cart_popup").html($(e).filter("div#cart_popup").html()), $(".mobile-nav-cart").html($(e).filter(".mobile-nav-cart").html()), $("#filter-cart").html($(e).filter("#filter-cart").html()), window.show_multiple_currencies && (theme.CurrencyPicker.convert("#cart_popup .money"), theme.CurrencyPicker.convert("#cart_block .money"))
                },
                error: function(e) {
                    console.log(e)
                }
            }).done(function() {
                if ("ajax_notify" == window.shopping_cart_type) {
                    var o = [{
                        product_url: e.url,
                        product_name: e.title
                    }];
                    $.notify({
                        message: $("<div>").append($("#cart_success").tmpl(o).clone()).html(),
                        target: "_blank"
                    }, {
                        type: "success",
                        showProgressbar: !0,
                        z_index: 2031,
                        mouse_over: "pause",
                        placement: {
                            from: "top",
                            align: window.rtl ? "left" : "right"
                        }
                    })
                } else roar.popupCart(a)
            });
            else {
                var o = $.parseJSON(e.responseText);
                $.ajax({
                    url: "/search?view=cart_error&q=" + o.description,
                    beforeSend: function() {},
                    success: function(e) {
                        $("div#cart_error_popup").html($(e).filter("div#cart_error_popup").html())
                    },
                    error: function(e) {
                        console.log(e)
                    }
                }).done(function() {
                    if ("ajax_notify" == window.shopping_cart_type) {
                        var r = i = $.parseJSON(e.responseText),
                            t = r.message + ": " + r.description;
                        $.notify({
                            message: t,
                            target: "_blank"
                        }, {
                            type: "info",
                            showProgressbar: !0,
                            z_index: 2031,
                            mouse_over: "pause",
                            placement: {
                                from: "top",
                                align: window.rtl ? "left" : "right"
                            }
                        })
                    } else roar.popupCart(a)
                })
            }
        },
        removeCart: function() {
            $(document).on("click", ".mini-cart-info .remove a", function(e) {
                e.preventDefault();
                var t = $(this),
                    a = t.attr("data-id");
                $.ajax({
                    type: "POST",
                    url: "/cart/change.js",
                    data: "quantity=0&id=" + a,
                    dataType: "json",
                    beforeSend: function() {
                        $("#cart_content").addClass("loading")
                    },
                    success: function() {
                        $.ajax({
                            url: "/search?view=cart",
                            beforeSend: function() {},
                            success: function(e) {
                                $("div#cart_block").html($(e).filter("div#cart_block").html()), $("div#cart_popup").html($(e).filter("div#cart_popup").html()), $(".mobile-nav-cart").html($(e).filter(".mobile-nav-cart").html()), $("#filter-cart").html($(e).filter("#filter-cart").html()), window.show_multiple_currencies && (theme.CurrencyPicker.convert("#cart_popup .money"), theme.CurrencyPicker.convert("#cart_block .money"))
                            },
                            error: function(e) {
                                console.log(e)
                            }
                        }).done(function() {
                            $("#cart_content").removeClass("loading")
                        })
                    },
                    error: function(e, t) {
                        Shopify.onError(e, t), $("#cart_content").removeClass("loading")
                    }
                })
            })
        },
        popupCart: function(e) {
            !0 == e ? $.magnificPopup.open({
                items: {
                    src: "#cart_popup",
                    type: "inline"
                },
                tLoading: "",
                mainClass: "popup-module mfp-with-zoom popup-type-1",
                removalDelay: 200,
                callbacks: {
                    open: function() {
                        $("#cart_popup .continue-shopping").unbind("click"), $("body").on("click", "#cart_popup .continue-shopping", function(e) {
                            e.preventDefault(), $.magnificPopup.close()
                        })
                    }
                }
            }) : $.magnificPopup.open({
                items: {
                    src: "#cart_error_popup",
                    type: "inline"
                },
                tLoading: "",
                mainClass: "popup-module mfp-with-zoom popup-type-1",
                removalDelay: 200
            })
        },
        handlePopups: function() {
            function r() {
                if (0 == window.popup_mailchimp_expire ? $("#popup-mailchimp .dont-show-me").change(function() {
                        $(this).is(":checked") ? n() : t()
                    }) : 1 == window.popup_mailchimp_expire && t(), !o()) {
                    var a = parseInt(window.popup_mailchimp_delay, 20),
                        e = parseInt(window.popup_mailchimp_close, 20);
                    setTimeout(function() {
                        $.magnificPopup.open({
                            items: {
                                src: "#popup-mailchimp",
                                type: "inline"
                            },
                            tLoading: "",
                            mainClass: "popup-module mfp-with-zoom popup-type-1",
                            removalDelay: 200
                        }), 0 < e && setTimeout(function() {
                            $.magnificPopup.close()
                        }, e)
                    }, a), 2 == window.popup_mailchimp_expire && n()
                }
                var s = $("#mc-form"),
                    l = s.attr("action");
                s.ajaxChimp({
                    url: l,
                    callback: function() {}
                })
            }

            function n() {
                try {
                    var a = parseInt(window.popup_mailchimp_period);
                    0 >= a && (a = 1);
                    var o = "domain=." + document.domain,
                        t = new Date;
                    t.setTime(t.getTime() + 1e3 * (60 * (60 * (24 * a))));
                    var r = "; expires=" + t.toGMTString();
                    document.cookie = "popup-module-mailchimp=true" + r + "; path=/; " + o
                } catch (e) {
                    console.log(e.message)
                }
            }

            function t() {
                try {
                    var t = "domain=." + document.domain;
                    document.cookie = "popup-module-mailchimp=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; " + t
                } catch (t) {
                    console.log(t.message)
                }
            }

            function o() {
                try {
                    if (0 < document.cookie.length) {
                        var e = document.cookie.indexOf("popup-module-mailchimp=");
                        if (-1 != e) {
                            e = e + "popup-module-mailchimp".length + 1;
                            var a = document.cookie.indexOf(";", e);
                            return -1 == a && (a = document.cookie.length), unescape(document.cookie.substring(e, a))
                        }
                    }
                } catch (t) {
                    console.log(t.message)
                }
            }
            $("#popup-mailchimp").length && ($("#popup-mailchimp").hasClass("hidden-xs") ? 768 <= roar.getWidthBrowser() && r() : r())
        },
        handleVerticalMenu: function() {
            $(".category_trigger").click(function() {
                (768 > roar.getWidthBrowser() || $("html").hasClass("touch")) && ($(".shop_category").hasClass("is_open") ? ($(".shop_category").removeClass("is_open"), $(".shop_category .submenu-group").slideUp()) : ($(".shop_category").addClass("is_open"), $(".shop_category .submenu-group").slideDown()))
            }), $(".shop_category .has-children>span>.fa").click(function() {
                var a = $(this).closest(".menu-item"),
                    e = a.find(".submenu");
                (768 > roar.getWidthBrowser() || $("html").hasClass("touch")) && (a.hasClass("is_open") ? (a.removeClass("is_open"), e.slideUp()) : (a.addClass("is_open"), e.slideDown()))
            })
        },
        updateGroupedPrice: function() {
            if (0 != $("#grouped-price").length) {
                var e = 0;
                $(".grouped-product-item .grouped-checkbox").each(function() {
                    $(this).is(":checked") && (e += parseFloat($($(this).data("id")).find("div.price").data("price")), $("#grouped-price").html("<span class=\"money\">" + theme.Currency.formatMoney(e, theme.settings.moneyFormat) + "</span>"), window.show_multiple_currencies && theme.CurrencyPicker.convert("#grouped-price .money"))
                })
            }
        },
        handleQuickshop: function(e) {
            var e = e || "body",
                t = "";
            return $(e).find(".quickview .quick_view").magnificPopup({
                type: "ajax",
                preloader: !0,
                tLoading: "",
                mainClass: "quickview",
                removalDelay: 200,
                gallery: {
                    enabled: !1
                },
                callbacks: {
                    open: function() {
                        0 < $("#main").next(".product-360-view-wrapper").length && $("#main").next(".product-360-view-wrapper").remove()
                    },
                    ajaxContentAdded: function() {
                        roar.handleReviews();
                        var t = new theme.Sections;
                        t.register("product-quickview-template", theme.Product), roar.initCountdown(), window.show_multiple_currencies && theme.CurrencyPicker.convert("#ProductSection-product-quickview-template .money"), Shopify.PaymentButton.init();
                        var a = $(".quickview").find(".add-to-wishlist");
                        a.attr("title", a.attr("data-added")).addClass("added").find("span").text(a.attr("data-added")), setTimeout(function() {
                            $(window).trigger("resize")
                        }, 1e3)
                    },
                    beforeClose: function() {
                        0 < $(".quickview._reopen").length && "" != $(".quickview._reopen").data("_qid") && (t = $(".quickview._reopen").data("_qid"))
                    },
                    afterClose: function() {
                        "" != t && ($(t).trigger("click"), t = "")
                    }
                }
            }), !1
        },
        mapClearFilter: function() {
            $(".mfilter-box .column").each(function() {
                var a = $(this);
                0 < a.find("input:checked").length && a.find(".clear").on("click", function(e) {
                    var r = [];
                    Shopify.queryParams.constraint && (r = Shopify.queryParams.constraint.split("+")), a.find("input:checked").each(function() {
                        var o = $(this),
                            e = o.val();
                        if (e) {
                            var t = r.indexOf(e);
                            0 <= t && r.splice(t, 1)
                        }
                    }), r.length ? Shopify.queryParams.constraint = r.join("+") : delete Shopify.queryParams.constraint, roar.filterAjaxClick(), e.preventDefault()
                })
            })
        },
        mapSingleFilter: function() {
            $("body").on("change", ".advanced-filter .field:not(.disable) input", function() {
                var r = $(this).parent(),
                    e = $(this).val(),
                    n = [];
                if (Shopify.queryParams.constraint && (n = Shopify.queryParams.constraint.split("+")), !window.enable_filter_multiple_choice && !r.hasClass("active")) {
                    var t = r.parents(".advanced-filter").find(".active");
                    0 < t.length && t.each(function() {
                        var a = $(this).data("handle");
                        if ($(this).removeClass("active"), a) {
                            var e = n.indexOf(a);
                            0 <= e && n.splice(e, 1)
                        }
                    })
                }
                if (e) {
                    var a = n.indexOf(e);
                    0 > a ? (n.push(e), r.addClass("active")) : (n.splice(a, 1), r.removeClass("active"))
                }
                n.length ? Shopify.queryParams.constraint = n.join("+") : delete Shopify.queryParams.constraint, roar.filterAjaxClick()
            })
        },
        mapSingleCollection: function() {
            $("body").on("click", ".advanced-collection .field", function(a) {
                var e = $(this),
                    t = e.attr("href");
                e.hasClass("active") || (roar.filterAjaxClick(t), $(".advanced-collection .field").removeClass("active"), e.addClass("active"), a.preventDefault())
            })
        },
        mapSingleSort: function() {
            $("body").on("change", ".advanced-sortby .field", function(a) {
                var e = $(this),
                    t = e.val();
                Shopify.queryParams.sort_by = t, roar.filterAjaxClick(), a.preventDefault()
            })
        },
        mapSingleLimit: function() {
            $("body").on("change", ".advanced-limit .field", function(a) {
                var e = $(this),
                    t = e.val();
                Shopify.queryParams.view = t, roar.filterAjaxClick(), a.preventDefault()
            })
        },
        mapSinglePagination: function() {
            $("body").on("click", "#mfilter-content-container .advanced-pagination a", function(a) {
                var e = $(this);
                delete Shopify.queryParams.page, delete Shopify.queryParams.constraint, delete Shopify.queryParams.q, delete Shopify.queryParams.sort_by, roar.filterAjaxClickPaging(e.attr("href")), a.preventDefault()
            })
        },
        mapFilters: function() {
            roar.handleGridList(), roar.handleShopView(), roar.mapPagination()
        },
        mapPaginationCallback: function() {
            roar.handleGridList(), roar.handleShopView(), roar.handleQuickshop(), roar.handleReviews(), roar.initCountdown(), roar.initProductQuickShopItem("#mfilter-content-container"), roar.initLazyLoading("#sandbox", !0), window.show_multiple_currencies && theme.CurrencyPicker.convert("#sandbox .money")
        },
        mapPagination: function() {
            if ($(document.body).on("click", ".fastor_ajax_load_button a", function(t) {
                    if (t.preventDefault(), $(".pagination a.next").length) {
                        $(".fastor_ajax_load_button a").attr("data-processing", 1);
                        var e = $(".pagination a.next").attr("href"),
                            a = $(".fastor_ajax_load_button a").attr("data-loading-items"),
                            o = $(".fastor_ajax_load_button a").attr("data-no-more");
                        $(".fastor_ajax_load_button").hide(), $(".pagination").before("<div class=\"fastor_ajax_load_more_loader animated fadeIn\"><a href=\"#\"><i class=\"icon-px-outline-load\"></i>&nbsp;&nbsp;<span>" + a + "</span></a></div>"), $.get(e, function(e) {
                            $(".advanced-pagination").html($(e).find(".advanced-pagination").html()), $(e).find(".product-list .product").each(function() {
                                $(".product-list .product:last").after($(this))
                            }), $(e).find(".product-grid .product-item").each(function() {
                                $(".product-grid .product-item:last").after($(this))
                            }), roar.mapPaginationCallback(), $(".fastor_ajax_load_more_loader").fadeOut("slow"), $(".fastor_ajax_load_button").fadeIn("slow"), $(".fastor_ajax_load_button a").attr("data-processing", 0), 0 == $(".pagination a.next").length && ($(".fastor_ajax_load_button").addClass("finished").removeClass("fastor_ajax_load_more_hidden"), $(".fastor_ajax_load_button a").show().html(o).addClass("disabled"))
                        })
                    } else {
                        var o = $(".fastor_ajax_load_button a").attr("data-no-more");
                        $(".fastor_ajax_load_button").addClass("finished").removeClass("fastor_ajax_load_more_hidden"), $(".fastor_ajax_load_button a").show().html(o).addClass("disabled")
                    }
                }), $(".fastor_ajax_load_button").hasClass("fastor_ajax_load_more_hidden")) {
                Math.abs(0);
                $(window).scroll(function() {
                    if ($(".products").length) {
                        var e = $(".products").offset().top + $(".products").outerHeight(),
                            t = e - $(window).scrollTop();
                        t - 0 < $(window).height() && 0 == $(".fastor_ajax_load_button a").attr("data-processing") && $(".fastor_ajax_load_button a").trigger("click")
                    }
                })
            }
        },
        filterCreateUrl: function(a) {
            var e = $.param(Shopify.queryParams).replace(/%2B/g, "+");
            return a ? "" == e ? a : a + "?" + e : location.pathname + "?" + e
        },
        updateQueryStringParameter: function(e, t, a) {
            var o = new RegExp("([?&])" + t + "=.*?(&|$)", "i"),
                r = -1 === e.indexOf("?") ? "?" : "&";
            return e.match(o) ? e.replace(o, "$1" + t + "=" + a + "$2") : e + r + t + "=" + a
        },
        filterCreateUrlPaging: function(t) {
            var e = 1,
                a = t.split("page=");
            return 1 < a.length && (e = parseInt(a[1])), roar.updateQueryStringParameter(window.location.href, "page", e)
        },
        filterAjaxClick: function(a) {
            delete Shopify.queryParams.page;
            var e = roar.filterCreateUrl(a);
            roar.filterGetContent(e)
        },
        filterAjaxClickPaging: function(a) {
            delete Shopify.queryParams.page;
            var e = roar.filterCreateUrlPaging(a);
            roar.filterGetContent(e)
        },
        filterGetContent: function(a) {
            $.ajax({
                type: "get",
                url: a,
                beforeSend: function() {
                    roar.destroyCountdown(), $("body").addClass("is_loading").removeClass("open_filter")
                },
                success: function(e) {
                    var t = e.match("<title>(.*?)</title>")[1];
                    $(e).find(".breadcrumb-content").length && $(".breadcrumb-content").html($(e).find(".breadcrumb-content").html()), $(".category-info").remove(), $(e).find(".category-info").length && $("#mfilter-content-container").prepend($(e).find(".category-info")), $("#sandbox").empty().html($(e).find("#sandbox").html()), $(".mfilter-box .mfilter-content").empty().html($(e).find(".mfilter-box .mfilter-content").html()), $("#mfilter-content-container .advanced-pagination").empty().html($(e).find("#mfilter-content-container .advanced-pagination").html()), $(".page-top").empty().html($(e).find(".page-top").html()), History.pushState({
                        param: Shopify.queryParams
                    }, t, a), setTimeout(function() {
                        $("html,body").animate({
                            scrollTop: $("body #sandbox").offset().top
                        }, 500, "swing")
                    }, 100), $("body").removeClass("is_loading"), roar.mapClearFilter(), roar.handleQuickshop(), roar.handleReviews(), roar.initCountdown(), roar.initProductQuickShopItem("#mfilter-content-container"), roar.initFilterSidebar(), roar.initLazyLoading("#sandbox", !0), window.show_multiple_currencies && theme.CurrencyPicker.convert("#sandbox .money")
                },
                error: function() {
                    $("body").removeClass("is_loading")
                }
            })
        },
        handleReviews: function() {
            "undefined" != typeof SPR && (SPR.registerCallbacks(), SPR.initRatingHandler(), SPR.initDomEls(), SPR.loadProducts(), SPR.loadBadges())
        },
        convertToSlug: function(t) {
            return t.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "")
        },
        getWidthBrowser: function() {
            var t;
            return "number" == typeof window.innerWidth ? t = window.innerWidth : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? t = document.documentElement.clientWidth : document.body && (document.body.clientWidth || document.body.clientHeight) && (t = document.body.clientWidth), t
        },
        handleScrollToTop: function() {
            $(window).scroll(function() {
                if (767 < $(window).width()) {
                    var e = $(this).scrollTop(),
                        t = $(this).height(),
                        a = 1;
                    0 < e && (a = e + t / 2);
                    var o = $("#scroll-top");
                    1e3 > a ? o.removeClass("on") : o.addClass("on")
                } else {
                    var e = $(this).scrollTop();
                    if (0 < $("#shopify-section-mobile-nav").length) var t = $("#shopify-section-mobile-nav").offset().top + $("#shopify-section-mobile-nav").height();
                    else var t = $("header").offset().top + $("header").height();
                    var o = $("#widgets");
                    t > e ? o.removeClass("on") : o.addClass("on")
                }
            }), $("#scroll-top").click(function(t) {
                t.preventDefault(), $("html,body").animate({
                    scrollTop: 0
                }, 800, "swing")
            })
        },
        handleGMap: function() {
            $("#contact_map").length && $().gMap && $("#contact_map").gMap({
                zoom: 17,
                scrollwheel: !1,
                maptype: "ROADMAP",
                markers: [{
                    address: window.contact_map_address,
                    html: "_address",
                    icon: {
                        iconsize: [188, 68],
                        iconanchor: [0, 68]
                    }
                }]
            })
        },
        handleGridList: function() {
            $(document).on("click", "#grid", function() {
                $("#mfilter-content-container").removeClass("list").addClass("grid")
            }), $(document).on("click", "#list", function() {
                $("#mfilter-content-container").removeClass("grid").addClass("list"), $("body").removeClass("flex-view-2 flex-view-3 flex-view-4 flex-view-6").addClass("flex-view-1")
            })
        },
        handleShopView: function() {
            var e, t;
            0 < $("#mfilter-content-container .shop__view").length && ($("#mfilter-content-container .shop__view").unbind("click"), $("#mfilter-content-container .shop__view").on("click", function() {
                e = "flex-view-1 flex-view-" + $("#mfilter-content-container .shop__view.active").data("per_row"), !$(this).hasClass("active") && ("grid" == $(this).data("view") ? (t = "flex-view-" + $(this).data("per_row"), $(document.body).removeClass("flex-view-1 flex-view-2 flex-view-3 flex-view-4 flex-view-6").addClass(t), $("#mfilter-content-container").removeClass("list").addClass("grid")) : ($("#mfilter-content-container").removeClass("grid").addClass("list"), $("body").removeClass("flex-view-2 flex-view-3 flex-view-4 flex-view-6").addClass("flex-view-1")), $("#mfilter-content-container .shop__view").removeClass("active"), $(this).addClass("active")), roar.initLazyLoading()
            }))
        },
        handleSearch: function() {
            $(".button-search, .header-type-3 #top .search_form, .header-type-8 .search_form").bind("click", function() {
                $(this).closest("form").submit()
            })
        },
        handleSmoothScroll: function() {
            $(document).on("click", ".smoothscroll", function(a) {
                a.preventDefault();
                var e = $(this).attr("href");
                $(e).trigger("click"), setTimeout(function() {
                    $("html,body").animate({
                        scrollTop: $(e).offset().top - 100
                    }, 800, "swing")
                }, 300)
            })
        },
        handleOrder: function() {
            $(".orderable").each(function(a, e) {
                var t = $(e).children("div[data-order]");
                t.sort(function(a, e) {
                    return +$(a).data("order") - +$(e).data("order")
                }), t.appendTo(e)
            })
        },
        handleDropdown: function() {
            $("[data-toggle='dropdown']").on("click", function() {
                $(this).parent().toggleClass("open")
            })
        }
    },
    roarLookbook = {
        getSizedImageUrl: function(r, t) {
            var e = document.createElement("a");
            if (e.href = r, "cdn.shopify.com" != e.hostname) return r;
            if (null == t) return r;
            if ("master" == t) return roarLookbook.removeProtocol(r);
            var n = r.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
            if (null != n) {
                var e = r.split(n[0]),
                    s = n[0];
                return roarLookbook.removeProtocol(e[0] + "_" + t + s)
            }
            return null
        },
        removeProtocol: function(e) {
            return e.replace(/http(s)?:/, "")
        },
        isProductUrl: function(e) {
            var t = window.location.hostname,
                a = document.createElement("a");
            return a.href = e, console.log(t), console.log(a.hostname), a.hostname == t
        },
        buildLookbook: function() {
            $(".roarlookbook").each(function(e) {
                var t = $(this);
                if (!t.hasClass("roarlookbook_init")) {
                    var a = t.attr("data-lookbook"),
                        o = {
                            lookbook: a,
                            action: "lookbook_get"
                        };
                    o = $.param(o), $.ajax({
                        type: "POST",
                        url: "/apps/roarlookbook",
                        async: !0,
                        cache: !1,
                        data: o,
                        dataType: "json",
                        beforeSend: function() {},
                        error: function() {},
                        success: function(o) {
                            t.append(o);
                            var r = t.find(".media__blank-preview");
                            r.imagesLoaded(function() {
                                t.addClass("roarlookbook_init").attr("data-lookbook", a + e), r.addClass("sfx-fadeIn")
                            })
                        }
                    })
                }
            })
        },
        resetHotspots: function(e) {
            var t = $(".hotspot", e),
                a = e.attr("data-lookbook");
            t.each(function() {
                var t = $(this),
                    o = t.attr("data-id"),
                    r = $("#" + a + "-" + o, e);
                r.fadeOut("fast", function() {
                    r.remove(), t.removeClass("hotspot_init")
                })
            })
        },
        hotspotPopup: function() {
            $(".roarlookbook").on("click", ".hotspot", function() {
                var e = $(this);
                if (!e.hasClass("hotspot_init")) {
                    var t = e.closest(".roarlookbook"),
                        a = e.attr("data-id"),
                        o = e.closest(".roarlookbook").attr("data-lookbook") + "-" + a,
                        r = "#" + e.closest(".roarlookbook").attr("data-lookbook") + "-" + a,
                        n = e.attr("data-title"),
                        s = e.attr("data-image"),
                        l = e.attr("data-price"),
                        d = e.attr("data-url"),
                        c = "";
                    if ("" == n && "" == d) return !1;
                    if (roarLookbook.resetHotspots(t), c += "<div id=\"" + o + "\" class=\"hotspot-widget hotspot-loading\">", c += "<div class=\"hotspot-content\">", c += "<span class=\"hotspot-close\">\xD7</span>", c += "<div class=\"hotspot-inner\">", "" != s) {
                        var p = "<img src=\"" + roarLookbook.getSizedImageUrl(s, "80x") + "\" src=\"" + roarLookbook.getSizedImageUrl(s, "300x") + "\" data-srcset=\"" + roarLookbook.getSizedImageUrl(s, "300x") + " 1x, " + roarLookbook.getSizedImageUrl(s, "600x") + " 2x\" alt=\"\" />";
                        c += "" == d ? p : "<a href=\"" + d + "\">" + p + "</a>"
                    }
                    if ("" != n && (c += "<h3>", c += "" == d ? n : "<a href=\"" + d + "\">" + n + "</a>", c += "</h3>"), "" != l && (c += "<div class=\"price\"><span class=\"money\">" + l + "</span></div>", roarLookbook.isProductUrl(d) && (c += "<div class=\"hotspot-btns\">", c += "<div class=\"hotspot-btn\"><a href=\"" + d + "\">" + theme.apps.details + "</a></div>", c += "<div class=\"hotspot-btn\"><a class=\"roar_add_to_cart\" href=\"" + d + "?add-to-cart=true\">" + theme.apps.buyNow + "</a></div>", c += "</div>")), c += "</div>", c += "</div>", c += "</div>", $(r).length || t.append(c), $(r).imagesLoaded(function() {
                            var a = $(r),
                                o = e.offset().left,
                                n = e.offset().top,
                                s = a.outerWidth(),
                                l = a.outerHeight(),
                                d = t.offset().left,
                                c = t.offset().top,
                                p = t.outerWidth() - (o + s),
                                u = "hotspot-right";
                            50 > p ? (o = o - s - 5, u = "hotspot-left") : o = o + e.outerWidth() + 5, n = n + e.outerHeight() / 2 - l / 2, a.css({
                                left: o - d,
                                top: n - c
                            }).removeClass("hotspot-left").removeClass("hotspot-right").addClass(u), e.addClass("hotspot_init"), a.removeClass("hotspot-loading").fadeIn("fast")
                        }), $(r).find("img").length) {
                        var u = $(r).find("img");
                        u.attr("src", u.attr("data-src")).removeAttr("data-src").attr("srcset", u.attr("data-srcset")).removeAttr("data-srcset")
                    }
                } else {
                    var t = e.closest(".roarlookbook");
                    roarLookbook.resetHotspots(t)
                }
            }), $(document).on("click", ".hotspot-close", function() {
                var e = $(this),
                    t = e.closest(".hotspot-widget"),
                    a = t.attr("id"),
                    o = a.split("-"),
                    r = o[1];
                $(".roarlookbook .hotspot[data-id=\"" + r + "\"]").removeClass("hotspot_init"), t.fadeOut("fast", function() {
                    t.remove()
                })
            }), $(".roarlookbook").on("click", ".image-preview", function() {
                var e = $(this).closest(".roarlookbook");
                roarLookbook.resetHotspots(e)
            }), $(window).resize(function() {
                $(".roarlookbook .hotspot_init").length && $(".roarlookbook .hotspot_init").each(function() {
                    var e = $(this);
                    e.removeClass("hotspot_init").trigger("click")
                })
            })
        },
        addToCart: function() {
            $(document).on("click", ".roar_add_to_cart", function(e) {
                e.preventDefault();
                var t = $(this),
                    a = t.closest(".roarlookbook"),
                    o = t.attr("href");
                $.ajax({
                    type: "GET",
                    url: o,
                    beforeSend: function() {},
                    success: function(e) {
                        var t = $(e).find("form[action=\"/cart/add\"]");
                        t.appendTo(a).submit().remove()
                    },
                    dataType: "html"
                })
            })
        },
        init: function() {
            $(".roarlookbook").length && (roarLookbook.buildLookbook(), roarLookbook.hotspotPopup(), roarLookbook.addToCart())
        }
    };
theme.CurrencyPicker = function() {
    function e() {
        if ("false" == r.auto_switch) return console.log("xxx"), !1;
        var e = Currency.cookie.read();
        null == e && $.getJSON("//ipinfo.io/json", function(e) {
            var t = JSON.parse(JSON.stringify(e, null, 2));
            "undefined" != typeof t.country && $.getJSON("//restcountries.eu/rest/v1/alpha/" + t.country, function(e) {
                var t = e.currencies,
                    a = t[0];
                $(o.currencyPicker + "[data-code=\"" + a + "\"]").trigger("click")
            })
        })
    }

    function t() {
        if ("false" == r.original_price) return !1;
        var e = Currency.currentCurrency,
            t = Currency.cookie.read(),
            a = r.shop_currency;
        t && (e = t), $(o.selector).each(function() {
            var t = $(this);
            if (t.removeAttr("data-currency-default"), a != e) {
                var o = t.attr("data-currency-" + a);
                "USD" == a && (o += " USD"), t.attr("data-currency-default", o)
            }
        })
    }

    function a() {
        return $(o.currencyNotification).length ? Currency.currentCurrency == r.shop_currency ? void $(o.currencyNotification).removeClass("loaded").slideUp() : void $(o.currencyNotification).each(function() {
            var e = $(this),
                t = e.data("html"),
                a = "<strong>" + Currency.currentCurrency + "</strong>";
            t = t.replace(/{{ current_currency }}/g, a), e.html(t), e.hasClass("loaded") || e.addClass("loaded").slideDown()
        }) : void 0
    }
    var o = {
            selector: ".money",
            container: ".currency__picker",
            currency: ".currency__picker .currency__switcher",
            currencyPicker: ".currency__picker .currency",
            currencyActive: ".currency__picker .currency.active",
            currencyCurrent: ".currency__picker .currency__current",
            currencyNotification: ".currency__notification"
        },
        r = {
            currency_format: "",
            shop_currency: "",
            default_currency: "",
            money_with_currency_format: "",
            money_format: "",
            auto_switch: "true",
            original_price: "true"
        };
    return {
        init: function() {
            if ($(o.currency).length) {
                var n = $(o.container);
                r.currency_format = n.find(".currency_format").val(), r.shop_currency = n.find(".shop_currency").val(), r.default_currency = n.find(".default_currency").val(), r.money_with_currency_format = n.find(".money_with_currency_format").val(), r.money_format = n.find(".money_format").val(), r.auto_switch = n.find(".auto_switch").val(), r.original_price = n.find(".original_price").val(), Currency.format = r.currency_format;
                var s = r.shop_currency;
                Currency.moneyFormats[s].money_with_currency_format = r.money_with_currency_format, Currency.moneyFormats[s].money_format = r.money_format;
                var l = r.default_currency,
                    d = Currency.cookie.read();
                $(".money .money").each(function() {
                    $(this).parents(".money").removeClass("money")
                }), $(o.selector).each(function() {
                    var e = $(this);
                    if ("undefined" == typeof e.attr("data-currency-" + r.shop_currency)) {
                        var t = e.text();
                        e.attr("data-currency-" + r.shop_currency, t)
                    }
                }), null == d ? s === l ? Currency.currentCurrency = l : Currency.convertAll(s, l, o.selector) : $(o.currency).length && 0 === $(o.currency + " .currency[data-code=" + d + "]").size() ? (Currency.currentCurrency = s, Currency.cookie.write(s)) : d === s ? Currency.currentCurrency = s : Currency.convertAll(s, d, o.selector), $(o.currency).on("click", ".currency:not(.active)", function() {
                    var e = $(this).data("code");
                    Currency.convertAll(Currency.currentCurrency, e, o.selector), $(o.currencyPicker).removeClass("active"), $(this).addClass("active"), $(o.currencyCurrent).text(Currency.currentCurrency).attr("data-code", Currency.currentCurrency), t(), a()
                });
                var c = window.selectCallback;
                $(o.currencyPicker).removeClass("active"), $(o.currency + " .currency[data-code=" + Currency.currentCurrency + "]").addClass("active"), $(o.currencyCurrent).text(Currency.currentCurrency).attr("data-code", Currency.currentCurrency), t(), e(), a()
            }
        },
        convert: function(e) {
            $(o.currency).length && ($(e).each(function() {
                var e = $(this);
                if ("undefined" == typeof e.attr("data-currency-" + r.shop_currency)) {
                    var t = e.text();
                    e.attr("data-currency-" + r.shop_currency, t)
                }
            }), Currency.convertAll(r.shop_currency, $(o.currencyActive).attr("data-code"), e, r.currency_format), t())
        },
        convertAll: function() {
            $(o.currency).length && ($(o.selector).each(function() {
                var e = $(this);
                if ("undefined" == typeof e.attr("data-currency-" + r.shop_currency)) {
                    var t = e.text();
                    e.attr("data-currency-" + r.shop_currency, t)
                }
            }), Currency.convertAll(r.shop_currency, $(o.currencyActive).attr("data-code"), o.selector), t())
        }
    }
}(), theme.LanguagePicker = function() {
    function e(e) {
        $(t.selector + " .goog-te-combo").val(e);
        var a, o = document.getElementsByClassName("goog-te-combo")[0],
            r = "change";
        document.createEvent ? (a = document.createEvent("HTMLEvents"), a.initEvent(r, !0, !0), o.dispatchEvent(a)) : (a = document.createEventObject(), a.eventType = r, o.fireEvent("on" + a.eventType, a))
    }
    var t = {
        language: ".language__picker .language__switcher",
        languagePicker: ".language__picker .language",
        languageCurrent: ".language__picker .language__current",
        selector: "#weketing_google_translate_element"
    };
    return {
        init: function() {
            $(t.language).length && $(t.selector).length && ($(t.selector).bind("google_translate", function() {
                var a = weketingJS.settingsJS[8];
                if ("yes" == a.enable) {
                    for (var o = a.default_language, r = a.custom_languages, n = weketingSGT.languages(), s = localStorage.getItem("roarStorage_language"), l = 0; l < r.length - 1; l++)
                        if (r[l] == o) {
                            r.pop();
                            break
                        } for (var l = 0; l < r.length; l++)
                        if (r[l] == s) {
                            o = s;
                            break
                        } for (var d, l = 0; l < r.length; l++) d = "<li class=\"language active notranslate\" data-code=\"" + o + "\">" + n[o] + "</li>", r[l] != o && (d = "<li class=\"language notranslate\" data-code=\"" + r[l] + "\">" + n[r[l]] + "</li>"), $(t.language).append(d);
                    $(t.languageCurrent).text(n[o]), e(o)
                }
            }), $("body").on("click", t.languagePicker + ":not(.active)", function() {
                var a = $(this).data("code");
                if ("" != a) {
                    var o = $(this).text();
                    $(t.languagePicker).removeClass("active"), $(t.languagePicker + "[data-code=\"" + a + "\"]").addClass("active"), $(t.languageCurrent).text(o), localStorage.setItem("roarStorage_language", a), e(a)
                }
            }), 0 < $(".dropdown.language-switcher").length && $(".dropdown.language-switcher").hover(function() {
                0 < $(".dropdown.language-switcher select").length && $(".dropdown.language-switcher select").attr("size", "4")
            }))
        }
    }
}(), window.theme = window.theme || {}, theme.Sections = function() {
    this.constructors = {}, this.instances = [], $(document).on("shopify:section:load", this._onSectionLoad.bind(this)).on("shopify:section:unload", this._onSectionUnload.bind(this)).on("shopify:section:select", this._onSelect.bind(this)).on("shopify:section:deselect", this._onDeselect.bind(this)).on("shopify:block:select", this._onBlockSelect.bind(this)).on("shopify:block:deselect", this._onBlockDeselect.bind(this))
}, theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
    _createInstance: function(e, t) {
        var a = $(e),
            o = a.attr("data-section-id"),
            r = a.attr("data-section-type");
        if (t = t || this.constructors[r], !_.isUndefined(t)) {
            var n = _.assignIn(new t(e), {
                id: o,
                type: r,
                container: e
            });
            this.instances.push(n)
        }
    },
    _onSectionLoad: function(e) {
        var t = $("[data-section-id]", e.target)[0];
        t && this._createInstance(t), roar.initLazyLoading()
    },
    _onSectionUnload: function(e) {
        this.instances = _.filter(this.instances, function(t) {
            var a = t.id === e.originalEvent.detail.sectionId;
            return a && _.isFunction(t.onUnload) && t.onUnload(e), !a
        })
    },
    _onSelect: function(e) {
        var t = _.find(this.instances, function(t) {
            return t.id === e.originalEvent.detail.sectionId
        });
        !_.isUndefined(t) && _.isFunction(t.onSelect) && t.onSelect(e)
    },
    _onDeselect: function(e) {
        var t = _.find(this.instances, function(t) {
            return t.id === e.originalEvent.detail.sectionId
        });
        !_.isUndefined(t) && _.isFunction(t.onDeselect) && t.onDeselect(e)
    },
    _onBlockSelect: function(e) {
        var t = _.find(this.instances, function(t) {
            return t.id === e.originalEvent.detail.sectionId
        });
        !_.isUndefined(t) && _.isFunction(t.onBlockSelect) && t.onBlockSelect(e)
    },
    _onBlockDeselect: function(e) {
        var t = _.find(this.instances, function(t) {
            return t.id === e.originalEvent.detail.sectionId
        });
        !_.isUndefined(t) && _.isFunction(t.onBlockDeselect) && t.onBlockDeselect(e)
    },
    register: function(e, t) {
        this.constructors[e] = t, $("[data-section-type=" + e + "]").each(function(e, a) {
            this._createInstance(a, t)
        }.bind(this))
    }
}), window.slate = window.slate || {}, theme.Images = function() {
    return {
        preload: function(e, t) {
            "string" == typeof e && (e = [e]);
            for (var a, o = 0; o < e.length; o++) a = e[o], this.loadImage(this.getSizedImageUrl(a, t))
        },
        loadImage: function(e) {
            new Image().src = e
        },
        switchImage: function(e, t, a) {
            var o = this.imageSize(t.src),
                r = this.getSizedImageUrl(e.src, o);
            a ? a(r, e, t) : t.src = r
        },
        imageSize: function(e) {
            var t = e.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);
            return null === t ? null : t[1]
        },
        getSizedImageUrl: function(e, t) {
            if (null == t) return e;
            if ("master" === t) return this.removeProtocol(e);
            var a = e.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
            if (null != a) {
                var o = e.split(a[0]),
                    r = a[0];
                return this.removeProtocol(o[0] + "_" + t + r)
            }
            return null
        },
        removeProtocol: function(e) {
            return e.replace(/http(s)?:/, "")
        }
    }
}(), theme.Currency = function() {
    return {
        formatMoney: function(e, t) {
            function a(e, t, a, o) {
                if (a = a || ",", o = o || ".", isNaN(e) || null === e) return 0;
                e = (e / 100).toFixed(t);
                var r = e.split("."),
                    n = r[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + a),
                    s = r[1] ? o + r[1] : "";
                return n + s
            }
            "string" == typeof e && (e = e.replace(".", ""));
            var o = "",
                r = /\{\{\s*(\w+)\s*\}\}/,
                n = t || "${{amount}}";
            switch (n.match(r)[1]) {
                case "amount":
                    o = a(e, 2);
                    break;
                case "amount_no_decimals":
                    o = a(e, 0);
                    break;
                case "amount_with_comma_separator":
                    o = a(e, 2, ".", ",");
                    break;
                case "amount_no_decimals_with_comma_separator":
                    o = a(e, 0, ".", ",");
                    break;
                case "amount_no_decimals_with_space_separator":
                    o = a(e, 0, " ");
                    break;
                case "amount_with_apostrophe_separator":
                    o = a(e, 2, "'");
            }
            return n.replace(r, o)
        }
    }
}(), slate.Variants = function() {
    function e(e) {
        this.$container = e.$container, this.product = e.product, this.singleOptionSelector = e.singleOptionSelector, this.originalSelectorId = e.originalSelectorId, this.enableHistoryState = e.enableHistoryState, this.currentVariant = this._getVariantFromOptions(), $(this.singleOptionSelector, this.$container).on("change", this._onSelectChange.bind(this))
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _getCurrentOptions: function() {
            var e = _.map($(this.singleOptionSelector, this.$container), function(e) {
                var t = $(e),
                    a = t.attr("type"),
                    o = {};
                return "radio" === a || "checkbox" === a ? !!t[0].checked && (o.value = t.val(), o.index = t.data("index"), o) : (o.value = t.val(), o.index = t.data("index"), o)
            });
            return e = _.compact(e), e
        },
        _getVariantFromOptions: function() {
            var e = this._getCurrentOptions(),
                t = this.product.variants,
                a = _.find(t, function(t) {
                    return e.every(function(e) {
                        return _.isEqual(t[e.index], e.value)
                    })
                });
            return a
        },
        _onSelectChange: function() {
            var e = this._getVariantFromOptions();
            this.$container.trigger({
                type: "variantChange",
                variant: e
            }), e && (this._updateMasterSelect(e), this._updateImages(e), this._updatePrice(e), this._updateSKU(e), this.currentVariant = e, this.enableHistoryState && this._updateHistoryState(e))
        },
        _updateImages: function(e) {
            var t = e.featured_image || {},
                a = this.currentVariant.featured_image || {};
            e.featured_image && t.src !== a.src && this.$container.trigger({
                type: "variantImageChange",
                variant: e
            })
        },
        _updatePrice: function(e) {
            e.price === this.currentVariant.price && e.compare_at_price === this.currentVariant.compare_at_price || this.$container.trigger({
                type: "variantPriceChange",
                variant: e
            })
        },
        _updateSKU: function(e) {
            e.sku === this.currentVariant.sku || this.$container.trigger({
                type: "variantSKUChange",
                variant: e
            })
        },
        _updateHistoryState: function(e) {
            if (history.replaceState && e) {
                var t = window.location.protocol + "//" + window.location.host + window.location.pathname + "?variant=" + e.id;
                window.history.replaceState({
                    path: t
                }, "", t)
            }
        },
        _updateMasterSelect: function(e) {
            $(this.originalSelectorId, this.$container).val(e.id)
        }
    }), e
}(), window.theme = window.theme || {}, theme.Product = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.settings = {
            imageSize: null,
            namespace: ".product-page-section",
            sectionId: a,
            sliderActive: !1,
            swatch_color: t.attr("data-product_swatch_color"),
            swatch_size: t.attr("data-product_swatch_size"),
            variant_image_grouped: t.attr("data-variant_image_grouped"),
            swatch_color_advanced: t.attr("data-product_swatch_color_advanced"),
            product_design: t.attr("data-product_design"),
            product_image_count: t.data("product_image_count")
        }, this.selectors = {
            product: "#ProductSection-" + a,
            addToCart: "#AddToCart-" + a,
            addToCartText: "#AddToCartText-" + a,
            stockText: ".stock-" + a,
            comparePrice: "#ComparePrice-" + a,
            originalPrice: "#ProductPrice-" + a,
            SKU: ".variant-sku",
            originalPriceWrapper: ".product-price__price-" + a,
            originalSelectorId: "#ProductSelect-" + a,
            productFeaturedImage: ".FeaturedImage-" + a,
            productImageWrap: "#FeaturedImageZoom-" + a,
            productPrices: ".product-single__price-" + a,
            productThumbImages: "#product-thumbnails-" + a,
            productMainImages: "#product-images-" + a,
            productPreviewMainImages: ".product-preview-images-" + a,
            saleLabel: ".product-price__sale-label-" + a,
            singleOptionSelector: ".single-option-selector-" + a,
            singleOptionSelectorId: "#single-option-selector-" + a,
            singleOptionSwatches: "wrapper-swatches-" + a,
            instagramProduct: "#product-instagram-" + a,
            instagramProductNameSpace: "product-instagram-" + a,
            variationsSelector: "#variations-" + a,
            variationSelector: ".variation-select-" + a,
            qtyVariant: ".qty-variant-" + a,
            threedId: ".threed-id-" + a,
            countDownId: ".countdown-" + a,
            couponCode: "#coupon-code-" + a,
            couponBtn: "#coupon-btn-" + a,
            sidebarSlide: ".sidebar-slick-vertical-" + a,
            optionsSelect: "#single-option-selector-" + a,
            stickCart: "#sticky-info-" + a,
            cartAgree: "#product-cart__agree-" + a,
            cartCheckout: "#product-buy__1click-" + a,
            groupedProduct: "#products-grouped-" + a,
            groupedButton: "#grouped-add-button-" + a,
            groupedCheckbox: "#products-grouped-" + a + " .grouped-checkbox"
        }, $("#ProductJson-" + a).html() && (this.productSingleObject = JSON.parse(document.getElementById("ProductJson-" + a).innerHTML), this.productSwatchSingleObject = JSON.parse(document.getElementById("ProductSwatchJson-" + a).innerHTML), this._stringOverrides(), this._initVariants(), this._initSwatches(), this._initFeature(), this._initCompact(), this._initStickyImages(), this._initThumbnailsGallery(), this._initImages(), this._initSidebar(), this._initZoom(), this._initGallery(), this._instagramProducts(), this._initQuantity(), this._initTabs(), this._initHandleProduct(), this._checkoutCart(), "product-template" == a && this._initRelatedProducts(), "product-template" == a && this._initViewedProducts(), "product-template" == a && this._initUpsellProducts(), "product-template" == a && this._initStickyInfo(), "product-template" == a && this._initGroupedProduct())
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _stringOverrides: function() {
            theme.productStrings = theme.productStrings || {}, $.extend(theme.strings, theme.productStrings)
        },
        _initGroupedProduct: function() {
            var e = $(this.selectors.groupedProduct);
            0 == e.length || ($(document).on("change", this.selectors.groupedCheckbox, function() {
                $(this).is(":checked") ? $($(this).data("id")).removeClass("hide") : $($(this).data("id")).addClass("hide"), roar.updateGroupedPrice()
            }), 0 < $(this.selectors.groupedButton).length && $(this.selectors.groupedButton).unbind("click"), $(document).on("click", this.selectors.groupedButton, function() {
                var t = $(this);
                return Shopify.queue = [], e.find(".grouped-checkbox").each(function() {
                    if ($(this).is(":checked")) {
                        var e = $($(this).data("id")).find("form .variation-select").val();
                        null !== e && Shopify.queue.push({
                            variantId: e,
                            quantity: 1
                        })
                    }
                }), Shopify.moveAlong = function() {
                    if (Shopify.queue.length) var e = Shopify.queue.shift(),
                        a = $.ajax({
                            type: "POST",
                            url: "/cart/add.js",
                            async: !0,
                            cache: !1,
                            data: {
                                quantity: e.quantity,
                                id: e.variantId
                            },
                            dataType: "json",
                            beforeSend: function() {
                                t.addClass("loading")
                            },
                            complete: function() {
                                roar.updateCart(t, !1)
                            },
                            error: function(e) {
                                var t = $.parseJSON(e.responseText),
                                    a = t.message + ": " + t.description;
                                alert(a)
                            },
                            success: function() {
                                Shopify.moveAlong()
                            }
                        });
                    else window.location.href = "/cart"
                }, Shopify.moveAlong(), !1
            }))
        },
        _initStickyInfo: function() {
            if ($(this.selectors.stickCart).length) {
                var e = this,
                    t = 0,
                    a = $("header").outerHeight() + $(".mini-breadcrumb").outerHeight() + $(".product-section-wrapper").offset().top;
                $(window).scroll(function() {
                    var e = $(this).scrollTop();
                    e > a ? $("body").addClass("show-sticky-info-product") : $("body").removeClass("show-sticky-info-product"), t = e
                }), $("body").on("click", ".sticky-button.button-cart", function() {
                    0 < $(e.selectors.addToCart).length && $(e.selectors.addToCart).trigger("click")
                })
            }
        },
        _checkoutCart: function() {
            var e = this,
                t = $(e.selectors.cartAgree);
            0 == t.length || ($(document).on("DOMNodeInserted", e.selectors.cartCheckout, function() {
                var e = $(this);
                setTimeout(function() {
                    var a = e.find(".shopify-payment-button__button");
                    a.length && (e.hide(), setTimeout(function() {
                        t.is(":checked") ? a.removeClass("btn-disabled") : a.addClass("btn-disabled"), e.fadeIn()
                    }, 300))
                }, 0)
            }), $(document).on("change", e.selectors.cartAgree, function() {
                var t = $(this),
                    a = $(e.selectors.cartCheckout).find(".shopify-payment-button__button");
                t.is(":checked") ? a.removeClass("btn-disabled") : a.addClass("btn-disabled")
            }))
        },
        _initTabs: function() {
            $("#tabs a").tabs()
        },
        _initHandleProduct: function() {
            0 == $("#main").next("#popup-product-sizechart").length && $("#main").after($("#popup-product-sizechart")), 0 == $("#main").next("#popup-product-question").length && $("#main").after($("#popup-product-question")), $(".button-product-question").click(function() {
                var e = $(this).data("question"),
                    t = $(this).data("_qid");
                return $.magnificPopup.open({
                    items: {
                        src: "#popup-product-question",
                        type: "inline"
                    },
                    tLoading: "",
                    mainClass: "popup-module mfp-with-zoom",
                    removalDelay: 200
                }), !1, void((0 < $(".quickview .mfp-content").find("#popup-product-question").length || 0 < $(".quickview .mfp-content").find("#popup-product-sizechart").length) && ($(".quickview.mfp-wrap").addClass("_reopen"), $(".quickview.mfp-wrap").data("_qid", t)))
            }), $(".button-product-sizechart").click(function() {
                var e = $(this).data("sizechart"),
                    t = $(this).data("_qid");
                return $.magnificPopup.open({
                    items: {
                        src: e,
                        type: "inline"
                    },
                    tLoading: "",
                    mainClass: "popup-module mfp-with-zoom",
                    removalDelay: 200
                }), !1, void((0 < $(".quickview .mfp-content").find("#popup-product-sizechart").length || 0 < $(".quickview .mfp-content").find("#popup-product-question").length) && ($(".quickview.mfp-wrap").addClass("_reopen"), $(".quickview.mfp-wrap").data("_qid", t)))
            }), $(document).on("click", "#tabProduct a", function(t) {
                t.preventDefault(), $(this).tab("show")
            })
        },
        _initUpsellProducts: function() {
            0 < $("#upsellProducts.carousel").length && $("#upsellProducts .carousel-inner").slick({
                arrows: !1,
                slidesToShow: 4,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                }, {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }],
                rtl: window.rtl
            }), $("#upsellProduct_next").click(function() {
                return $("#upsellProducts .carousel-inner").slick("slickNext"), !1
            }), $("#upsellProduct_prev").click(function() {
                return $("#upsellProducts .carousel-inner").slick("slickPrev"), !1
            }), roar.initLazyLoading("#upsellProducts .carousel-inner", !0)
        },
        _initRelatedProducts: function() {
            0 < $("#myCarouselRelated.carousel").length && $("#myCarouselRelated .carousel-inner").slick({
                arrows: !1,
                slidesToShow: 4,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                }, {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }],
                rtl: window.rtl
            }), $("#myCarouselRelated_next").click(function() {
                return $("#myCarouselRelated .carousel-inner").slick("slickNext"), !1
            }), $("#myCarouselRelated_prev").click(function() {
                return $("#myCarouselRelated .carousel-inner").slick("slickPrev"), !1
            }), roar.initLazyLoading("#myCarouselRelated .carousel-inner", !0)
        },
        _initViewedProducts: function() {
            var e = RoarCookie.cookie.rtread("rt-recent"),
                t = $(".templateProduct #recently-viewed-products").data("handle"),
                a = $(".templateProduct #recently-viewed-products").data("id"),
                o = $(".templateProduct #recently-viewed-products").data("limit");
            if (null != e) {
                e = e.split(",");
                var e = e.reverse();
                if (1 < e.length ? $("#recently-viewed-products").show() : e != t && $("#recently-viewed-products").show(), $.ajax({
                        url: "/search?view=viewed&q=" + e + "_sp_" + a,
                        dataType: "html",
                        type: "GET",
                        success: function(e) {
                            $("#recently-viewed-products").html(e), roar.initLazyLoading("#recently-viewed-products", !0), roar.initProductQuickShopItem("#recently-viewed-products")
                        },
                        error: function() {
                            console.log("ajax error")
                        },
                        complete: function() {
                            var t = $("#myCarouselViewed .carousel-inner");
                            t.slick({
                                arrows: !1,
                                slidesToShow: 4,
                                responsive: [{
                                    breakpoint: 1200,
                                    settings: {
                                        slidesToShow: 4,
                                        slidesToScroll: 4
                                    }
                                }, {
                                    breakpoint: 768,
                                    settings: {
                                        slidesToShow: 4,
                                        slidesToScroll: 4
                                    }
                                }, {
                                    breakpoint: 550,
                                    settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 2
                                    }
                                }],
                                rtl: window.rtl
                            }), $("#myCarouselViewed_next").click(function() {
                                return t.slick("slickNext"), !1
                            }), $("#myCarouselViewed_prev").click(function() {
                                return t.slick("slickPrev"), !1
                            }), roar.handleQuickshop("#recently-viewed-products")
                        }
                    }), 0 > e.indexOf(t)) {
                    e.length >= o && e.pop(), e.push(t);
                    try {
                        e = e.join(",")
                    } catch (e) {}
                }
            } else e = t;
            RoarCookie.cookie.rtwrite("rt-recent", e)
        },
        _initImages: function() {
            var e = this,
                t = $(e.selectors.productMainImages),
                a = !1;
            if (1 == parseInt(window.rtl) && (a = !0), "left" == this.settings.product_design || "bottom" == this.settings.product_design || "compact2" == this.settings.product_design || "split" == this.settings.product_design || "sidebar" == this.settings.product_design || "simple" == this.settings.product_design || "full-screen" == this.settings.product_design) {
                if (0 < $(e.selectors.productThumbImages).length) {
                    var o = $(e.selectors.productThumbImages).find(".thumbnails"),
                        r = "0" != $(e.selectors.productThumbImages).data("vertical"),
                        n = 6,
                        s = !1;
                    if (6 < this.settings.product_image_count ? (n = 6, s = !0) : n = this.settings.product_image_count - 1, $(".product-page-section").hasClass("product-has-sidebar") && (3 < this.settings.product_image_count ? (n = 3, s = !0) : n = this.settings.product_image_count - 1), !0 == s) t.not(".slick-initialized").slick({
                        rtl: a,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: !1,
                        adaptiveHeight: !0,
                        asNavFor: o,
                        prevArrow: "<span class=\"fa fa-angle-left slick-prev-arrow\"></span>",
                        nextArrow: "<span class=\"fa fa-angle-right slick-next-arrow\"></span>"
                    }), o.not(".slick-initialized").slick({
                        slidesToShow: n,
                        slidesToScroll: 1,
                        asNavFor: t,
                        focusOnSelect: !0,
                        vertical: r,
                        infinite: !1,
                        prevArrow: "<span class=\"fa fa-angle-up slick-prev-arrow\"></span>",
                        nextArrow: "<span class=\"fa fa-angle-down slick-next-arrow\"></span>",
                        responsive: [{
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3
                            }
                        }, {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 3
                            }
                        }, {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 3
                            }
                        }]
                    });
                    else {
                        t.not(".slick-initialized").slick({
                            rtl: a,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: !1,
                            adaptiveHeight: !0,
                            prevArrow: "<span class=\"fa fa-angle-left slick-prev-arrow\"></span>",
                            nextArrow: "<span class=\"fa fa-angle-right slick-next-arrow\"></span>"
                        });
                        var l = this.settings.product_design,
                            d = $(this.selectors.productFeaturedImage),
                            c = $(this.selectors.productMainImages);
                        o.find(".thumbnails-item").on("click", function(t) {
                            t.preventDefault();
                            var e = $(this).data("href").replace("https:", "").replace("http:", "").split("?v=")[0];
                            d.each(function() {
                                var t = $(this),
                                    a = t.attr("href");
                                if (0 <= a.indexOf(e) && !t.closest(".slick-slide").hasClass("slick-cloned")) {
                                    var o = t.closest(".slick-slide").attr("data-slick-index");
                                    return void("carousel" == l ? c.slick("slickGoTo", o) : c.slick("slickGoTo", o, !0))
                                }
                            }), o.find(".thumbnails-item").removeClass("current"), $(this).addClass("current")
                        }), c.on("beforeChange", function(e, t, a, r) {
                            console.log(r), console.log(d);
                            var n = $(d[r]).attr("href").replace("https:", "").replace("http:", "").split("?v=")[0];
                            o.find(".thumbnails-item").each(function() {
                                var e = $(this),
                                    t = e.data("href");
                                if (0 <= t.indexOf(n)) return o.find(".thumbnails-item").removeClass("current"), void $(this).addClass("current")
                            })
                        })
                    }
                }
            } else if ("carousel" == this.settings.product_design) {
                var p = t.width() / 4;
                t.not(".slick-initialized").slick({
                    rtl: a,
                    centerMode: !0,
                    centerPadding: p + "px",
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    adaptiveHeight: !0,
                    prevArrow: "<span class=\"fa fa-angle-left slick-prev-arrow\"></span>",
                    nextArrow: "<span class=\"fa fa-angle-right slick-next-arrow\"></span>",
                    responsive: [{
                        breakpoint: 1680,
                        settings: {
                            centerMode: !0,
                            centerPadding: "400px",
                            slidesToShow: 1
                        }
                    }, {
                        breakpoint: 1440,
                        settings: {
                            centerMode: !0,
                            centerPadding: "350px",
                            slidesToShow: 1
                        }
                    }, {
                        breakpoint: 1200,
                        settings: {
                            centerMode: !0,
                            centerPadding: "300px",
                            slidesToShow: 1
                        }
                    }, {
                        breakpoint: 1024,
                        settings: {
                            arrows: !1,
                            centerMode: !0,
                            centerPadding: "250px",
                            slidesToShow: 1
                        }
                    }, {
                        breakpoint: 992,
                        settings: {
                            centerMode: !0,
                            centerPadding: "200px",
                            slidesToShow: 1
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            arrows: !1,
                            centerMode: !0,
                            centerPadding: "125px",
                            slidesToShow: 1
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            arrows: !1,
                            centerMode: !0,
                            centerPadding: "50px",
                            slidesToShow: 1
                        }
                    }]
                })
            } else t.not(".slick-initialized").slick({
                rtl: a,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: !1,
                adaptiveHeight: !0,
                asNavFor: o,
                prevArrow: "<span class=\"fa fa-angle-left slick-prev-arrow\"></span>",
                nextArrow: "<span class=\"fa fa-angle-right slick-next-arrow\"></span>"
            });
            t.imagesLoaded(function() {
                t.addClass("loaded")
            })
        },
        _initThumbnailsGallery: function() {
            var e = $(this.selectors.productMainImages);
            "gallery" == this.settings.product_design && $(".thumbnail-gallery-item").on("click", function() {
                var t = $(this);
                t.hasClass("active") || ($(".thumbnail-gallery-item").removeClass("active"), t.addClass("active"), $(".thumbnail-gallery-item").each(function(a) {
                    if ($(this).attr("id") == t.attr("id")) return void e.slick("slickGoTo", a, !0)
                }))
            })
        },
        _initQuantity: function() {
            $(".q_up").unbind("click"), $(".q_up").on("click", function() {
                var e = $(this).data("product_id"),
                    t = parseInt($(".quantity-cart-" + e).val()) + 1;
                $(".quantity-cart-" + e).val(t)
            }), $(".q_down").unbind("click"), $(".q_down").on("click", function() {
                var e = $(this).data("product_id"),
                    t = parseInt($(".quantity-cart-" + e).val());
                1 < t && $(".quantity-cart-" + e).val(t - 1)
            })
        },
        _initPopup: function() {
            $(".sizechart-btn").magnificPopup({
                type: "image",
                midClick: !0
            }), $(".return-btn").click(function() {
                return $.magnificPopup.open({
                    items: {
                        src: "#delivery-return",
                        type: "inline"
                    },
                    tLoading: "",
                    mainClass: "popup-wrapper mfp-with-zoom",
                    removalDelay: 200
                }), !1
            })
        },
        _initFeature: function() {
            if (0 < $(this.selectors.product + " .product-video-button a").length && $(this.selectors.product + " .product-video-button a").unbind("click") && $(this.selectors.product + " .product-video-button a").click(function(t) {
                    t.stopPropagation();
                    var e = $(this).data("video"),
                        a = $(this).data("_qid");
                    $.magnificPopup.open({
                        items: {
                            src: e,
                            type: "iframe"
                        },
                        type: "iframe",
                        mainClass: "mfp-fade",
                        removalDelay: 160,
                        preloader: !1,
                        disableOn: !1,
                        fixedContentPos: !1,
                        callbacks: {
                            beforeClose: function() {
                                console.log("Popup close has been initiated")
                            }
                        }
                    }), (0 < $(".quickview .mfp-content").find(".product-360-view-wrapper").length || 0 < $(".quickview .mfp-content").find(".mfp-iframe-scaler").length) && ($(".quickview.mfp-wrap").addClass("_reopen"), $(".quickview.mfp-wrap").data("_qid", a))
                }), 0 < $(this.selectors.product + " .product-360-button a").length) {
                for (var e, t = $(this.selectors.product + " .product-360-button a").data("id"), a = $(this.selectors.product + " .product-360-button a").data("_qid"), o = $(this.selectors.product + " .product-360-button a"), r = [], n = JSON.parse(document.getElementById("threed-id-" + this.sectionId).innerHTML), s = 1; 72 >= s; s++) e = "f" + s, n[e] && r.push(n[e]);
                if (0 < r.length) {
                    var l = r.length;
                    $(this.selectors.threedId).ThreeSixty({
                        totalFrames: l,
                        endFrame: l,
                        currentFrame: 1,
                        imgList: ".threed-view-images",
                        progress: ".spinner",
                        imgArray: r,
                        height: null,
                        width: null,
                        responsive: !0,
                        navigation: !0,
                        onReady: function() {
                            0 == $("#main").next(".product-360-view-wrapper").length && $("#main").after($(t)), o.unbind("click") && o.click(function() {
                                $.magnificPopup.open({
                                    items: {
                                        src: t,
                                        type: "inline"
                                    },
                                    type: "inline",
                                    mainClass: "mfp-fade",
                                    removalDelay: 160,
                                    disableOn: !1,
                                    preloader: !1,
                                    fixedContentPos: !1,
                                    callbacks: {
                                        open: function() {
                                            console.log("xx11"), $(window).resize()
                                        }
                                    }
                                }), $(window).resize(), (0 < $(".quickview .mfp-content").find(".product-360-view-wrapper").length || 0 < $(".quickview .mfp-content").find(".mfp-iframe-scaler").length) && ($(".quickview.mfp-wrap").addClass("_reopen"), $(".quickview.mfp-wrap").data("_qid", a))
                            })
                        }
                    })
                }
            }
        },
        _initCompact: function() {
            0 < $(".product-accordions").length && $(".product-accordions .tab-heading").unbind("click") && $(".product-accordions .tab-heading").click(function(t) {
                t.preventDefault();
                var e = $(this),
                    a = e.closest(".product-accordion"),
                    o = e.closest(".product-accordions");
                a.hasClass("active") ? (a.removeClass("active"), a.find(".product-accordion-content").stop(!0, !0).slideUp()) : (o.find(".product-accordion").removeClass("active"), a.addClass("active"), o.find(".product-accordion-content").stop(!0, !0).slideUp(), a.find(".product-accordion-content").stop(!0, !0).slideDown())
            })
        },
        _initStickyImages: function() {
            $("body").hasClass("fastor-product-design-sticky") && $(".product-design-sticky .product-summary").stick_in_parent()
        },
        _instagramProducts: function() {
            if (0 < $("#instagram_product").length) {
                var e = $("#instagram_product").data("instagram_token"),
                    t = $("#instagram_product").data("user_id"),
                    a = $("#instagram_product").data("instagram_limit"),
                    o = new Instafeed({
                        get: "user",
                        target: "instagram_product",
                        accessToken: e,
                        userId: t,
                        limit: a,
                        resolution: "thumbnail",
                        resolution2: "standard_resolution",
                        template: "<div class=\"wrap animated\"><a target=\"_blank\" href=\"{{link}}\"><img src=\"{{image}}\" alt=\"{{caption}}\" width=\"150\" height=\"150\" /><span class=\"hover_border\"></span></a></div>"
                    });
                o.run()
            }
        },
        _initGallery: function() {
            (function(e) {
                function t(e, t) {
                    return -1 < (" " + e.className + " ").indexOf(" " + t + " ")
                }
                for (var a = function(e) {
                        for (var t, a, o, r, n = $(e).find(".photoswipe-item").get(), s = n.length, l = [], d = 0; d < s; d++)
                            if (t = n[d], 1 === t.nodeType)
                                if (a = t.children[0], o = a.getAttribute("data-size").split("x"), "video" == $(a).data("type")) {
                                    var c = $($(a).data("id")).html();
                                    l.push({
                                        html: c
                                    })
                                } else r = {
                                    src: a.getAttribute("href"),
                                    w: parseInt(o[0], 10),
                                    h: parseInt(o[1], 10)
                                }, 1 < t.children.length && (r.title = $(t).find(".caption").html()), 0 < a.children.length && (r.msrc = a.children[0].getAttribute("src")), r.el = t, l.push(r);
                        return l
                    }, o = function e(t, a) {
                        return t && (a(t) ? t : e(t.parentNode, a))
                    }, r = function(a) {
                        a = a || window.event, a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                        var r = a.target || a.srcElement,
                            n = o(r, function(e) {
                                return t(e, "photoswipe-item")
                            });
                        if (n) {
                            for (var l, d = n.closest(".photoswipe-wrapper"), c = $(n.closest(".photoswipe-wrapper")).find(".photoswipe-item").get(), p = c.length, u = 0, m = 0; m < p; m++)
                                if (1 === c[m].nodeType) {
                                    if (c[m] === n) {
                                        l = u;
                                        break
                                    }
                                    u++
                                } return 0 <= l && s(l, d), !1
                        }
                    }, n = function() {
                        var e = window.location.hash.substring(1),
                            t = {};
                        if (5 > e.length) return t;
                        for (var a = e.split("&"), o = 0; o < a.length; o++)
                            if (a[o]) {
                                var r = a[o].split("=");
                                2 > r.length || (t[r[0]] = r[1])
                            } return t.gid && (t.gid = parseInt(t.gid, 10)), t
                    }, s = function(e, t, o, r) {
                        var n, s, l, d = document.querySelectorAll(".pswp")[0];
                        if (l = a(t), s = {
                                closeOnScroll: !1,
                                galleryUID: t.getAttribute("data-pswp-uid")
                            }, !r) s.index = parseInt(e, 10);
                        else if (s.galleryPIDs) {
                            for (var c = 0; c < l.length; c++)
                                if (l[c].pid == e) {
                                    s.index = c;
                                    break
                                }
                        } else s.index = parseInt(e, 10) - 1;
                        isNaN(s.index) || (o && (s.showAnimationDuration = 0), n = new PhotoSwipe(d, PhotoSwipeUI_Default, l, s), n.init(), n.listen("beforeChange", function() {
                            var e = $(n.currItem.container);
                            $(".pswp__video").removeClass("active");
                            e.find(".pswp__video").addClass("active");
                            $(".pswp__video").each(function() {
                                $(this).hasClass("active") || $(this).attr("src", $(this).attr("src"))
                            })
                        }), n.listen("close", function() {
                            $(".pswp__video").each(function() {
                                $(this).attr("src", $(this).attr("src"))
                            }), $(".pswp__container .video-wrapper").empty()
                        }))
                    }, d = document.querySelectorAll(e), c = 0, p = d.length; c < p; c++) d[c].setAttribute("data-pswp-uid", c + 1), d[c].onclick = r;
                var l = n();
                l.pid && l.gid && s(l.pid, d[l.gid - 1], !0, !0)
            })(this.selectors.product + " .photoswipe-wrapper")
        },
        _initZoom: function() {
            if ($(".easyzoom").length)
                if (1024 < $(window).width()) var e = $(".easyzoom:not(.feature-video)").easyZoom({
                        loadingNotice: "",
                        errorNotice: "",
                        preventClicks: !1
                    }),
                    t = e.data("easyZoom");
                else $(".easyzoom a").click(function(e) {
                    e.preventDefault()
                })
        },
        _initSidebar: function() {
            var e = this;
            $sidebarSlide = $(e.selectors.sidebarSlide), 0 < $sidebarSlide.length && $sidebarSlide.each(function() {
                var e = $(this),
                    t = $(this).data("per_view");
                $(this).not(".slick-initialized").slick({
                    slidesToShow: t,
                    slidesToScroll: 1,
                    vertical: !0,
                    focusOnSelect: !0,
                    infinite: !1,
                    prevArrow: "<span class=\"fa fa-angle-up slick-prev-arrow\"></span>",
                    nextArrow: "<span class=\"fa fa-angle-down slick-next-arrow\"></span>"
                }), e.imagesLoaded(function() {
                    e.addClass("loaded")
                })
            })
        },
        _initForceHeight: function() {
            0 < $(this.selectors.productPreviewMainImages).length && $(this.selectors.productPreviewMainImages).not(".slick-initialized").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: !1,
                prevArrow: "<span class=\"fa fa-angle-left slick-prev-arrow\"></span>",
                nextArrow: "<span class=\"fa fa-angle-right slick-next-arrow\"></span>"
            })
        },
        _initSwatches: function() {
            function t(e) {
                var t = e.replace("https:", "").replace("http:", "").split("?v=")[0].split("/"),
                    a = t[t.length - 1].split("."),
                    o = a.pop(),
                    r = a.join(".") + "_100x." + o;
                return e.replace(t[t.length - 1], r)
            }

            function p(t, e, a, o, r) {
                if (1 < t.options.length)
                    for (i = 0; i < t.options.length; i++) i != e && $(u + "-" + i + " option").each(function() {
                        var o = "unavailable",
                            r = $(this).attr("value");
                        for (j = 0; j < t.variants.length; j++) {
                            var n = t.variants[j];
                            if (n.options[e] != a) continue;
                            else if (n.options[i] == r) {
                                o = !0 == n.available ? "available" : "sold_out";
                                break
                            }
                        }
                        var s = "#swatch-" + i + "-" + r.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
                        $(s).closest(".swatch-element").removeClass("available").removeClass("sold_out").removeClass("unavailable").addClass(o)
                    });
                else
                    for (i = 0; i < t.options.length; i++) $("#single-option-selector-product-template-" + i + " option").each(function() {
                        var e = "unavailable",
                            a = $(this).attr("value");
                        for (j = 0; j < t.variants.length; j++)
                            if (t.variants[j].options[i] == a) {
                                e = t.variants[j].available ? "available" : "sold_out";
                                break
                            } var o = "#swatch-" + i + "-" + a.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
                        $(o).closest(".swatch-element").removeClass("available").removeClass("sold_out").removeClass("unavailable").addClass(e)
                    });
                var n = r.settings.variant_image_grouped,
                    s = r.selectors.productMainImages + ".slick-slider",
                    l = r.selectors.productThumbImages + " .slick-slider",
                    d = a,
                    c = r.productSingleObject,
                    p = r.selectors.originalSelectorId;
                if ("1" == n && ("color" == o || "colour" == o) && 0 < $(l).find("[data-color='" + d + "']").length) {
                    $(l).slick("slickUnfilter").slick("slickFilter", "[data-color='" + d + "']");
                    var m = $(l).find(".slick-slide"),
                        h = 0,
                        g = !1;
                    m.each(function(e, t) {
                        $(t).attr("data-slick-index", e), jQuery.each(c.variants, function(a, o) {
                            if (o.id == $(p).val() && !1 == g) {
                                var r = o.featured_image.src.replace(/^https?\:/i, "").split("?")[0].replace(".png", "").replace(".jpg", ""),
                                    n = $(t).find("img").first().attr("src");
                                0 <= n.indexOf(r) && (h = e, g = !0)
                            }
                        })
                    }), $(l).slick("slickGoTo", h, !0), $(s).slick("slickUnfilter").slick("slickFilter", "[data-color='" + d + "']");
                    var m = $(s).find(".slick-slide"),
                        h = 0,
                        g = !1;
                    m.each(function(e, t) {
                        $(t).attr("data-slick-index", e), jQuery.each(c.variants, function(a, o) {
                            if (o.id == $(p).val() && !1 == g) {
                                var r = o.featured_image.src.replace(/^https?\:/i, "").split("?")[0].replace(".png", "").replace(".jpg", ""),
                                    n = $(t).find("img").first().attr("src");
                                0 <= n.indexOf(r) && (h = e, g = !0)
                            }
                        })
                    }), $(s).slick("slickGoTo", h, !0), $(".templateProduct .thumbnails .slick-list").width() >= $(".templateProduct .thumbnails .slick-track").width() ? $("body").append("<style id=\"product-images-filtering-style\" type=\"text/css\">.templateProduct .thumbnails .slick-track{transform:none!important;}</style>") : 0 < $("style#product-images-filtering-style").length && $("style#product-images-filtering-style").remove()
                }
            }
            var u = this.selectors.optionsSelect,
                v = this.productSingleObject,
                e = this.productSwatchSingleObject,
                y = [];
            if ("1" == this.settings.swatch_size && y.push("Size"), y.push("size"), "1" == this.settings.swatch_color && (y.push("Color"), y.push("Colour"), y.push("color"), y.push("colour")), 0 < y.length) {
                var o = !1,
                    b = !1,
                    w = 0,
                    C = theme.asset_url.substring(0, theme.asset_url.lastIndexOf("?")),
                    s = theme.asset_url.substring(theme.asset_url.lastIndexOf("?"), theme.asset_url.length);
                for (i = 0; i < v.options.length; i++) {
                    var c = "",
                        x = "",
                        S = "",
                        T = "",
                        P = "",
                        I = "",
                        A = "",
                        z = "img btooltip";
                    if (c = "object" == typeof v.options[i] ? v.options[i].name : v.options[i], o = !1, b = !1, -1 < y.indexOf(c)) {
                        o = !0, w = i;
                        var N = c.toLowerCase();
                        if (/color|colour/i.test(N) && (b = !0), o) {
                            var d = [];
                            for (j = 0; j < v.variants.length; j++) {
                                var m = v.variants[j],
                                    h = this.htmlEntities(m.options[w]),
                                    f = this.convertToSlug(h);
                                0 > d.indexOf(h) && ("color" != N && "colour" != N ? (A = h, z = "btooltip") : "1" == this.settings.swatch_color_advanced ? null !== e[f] && void 0 !== e[f] && "" != e[f] ? (z = "img btooltip swatch_color_advanced", A = "<i style=\"background-image: url(" + C + e[f] + ".png" + s + ")\"></i>") : null === m.featured_image ? A = "<i style=\"background-color:" + h + "; background-image: url(" + C + f + ".png" + s + ")\"></i>" : (z = "img btooltip swatch_color_advanced", A = "<i style=\"background-image: url(" + t(m.featured_image.src) + ")\"></i>") : A = "<i style=\"background-color:" + h + "; background-image: url(" + C + f + ".png" + s + ")\"></i>", I = $(this.selectors.singleOptionSelectorId + "-" + w).val() == h ? "selected " : "", S = S + "<div class=\"swatch-element " + N + f + " available\"><input data-id=\"" + this.selectors.singleOptionSelectorId + "-" + w + "\" data-value=\"" + h + "\"  class=\"swatch-radio " + I + "\" id=\"swatch-" + w + "-" + f + "\" type=\"radio\" data-swatch=\"" + N + "\" data-poption=\"" + w + "\" name=\"option-" + w + "\" value=\"" + h + "\"><label for=\"swatch-" + w + "-" + f + "\" class=\"" + z + "\" title=\"" + h + "\"><span class=\"soldout-image\"></span>" + A + "</label></div>", d.push(h))
                            }
                            x = "<div class=\"" + this.selectors.singleOptionSwatches + " wrapper-swatches swatch " + N + "\" data-attribute_name=\"attribute_pa_" + N + "\"><div>" + S + "</div></div>", T = $(this.selectors.singleOptionSelectorId + "-" + w), P = $(this.selectors.variationSelector + "-" + w), "" != x && (T.after(x), T.hide(), P.addClass("hide-choose-option"))
                        }
                    }
                }
            }
            var g = "",
                L = "." + this.selectors.singleOptionSwatches + " .swatch-radio",
                M = this;
            0 < $("." + this.selectors.singleOptionSwatches).length && (g = $(L), g.unbind("click"), g.on("click", function() {
                var e = $(this).data("id"),
                    t = $(this).data("poption"),
                    a = $(this).data("value"),
                    o = $(this).data("swatch");
                $(this).data("value") != $(e).val() && ($(e).val($(this).data("value")).trigger("change"), $(e).closest(".selector-wrapper").find(".swatch-radio").removeClass("selected"), $(this).addClass("selected"), $(e).closest(".selector-wrapper"), $(e).closest(".selector-wrapper").find(".option-select-value").html($(this).data("value"))), p(v, t, a, o, M)
            })), $(".swatch-radio.selected").trigger("click")
        },
        htmlEntities: function(t) {
            return (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        },
        convertToSlug: function(t) {
            return t.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
        },
        _initVariants: function() {
            var e = {
                $container: this.$container,
                enableHistoryState: this.$container.data("enable-history-state") || !1,
                singleOptionSelector: this.selectors.singleOptionSelector,
                originalSelectorId: this.selectors.originalSelectorId,
                product: this.productSingleObject
            };
            this.variants = new slate.Variants(e), this.$container.on("variantChange" + this.settings.namespace, this._updateAddToCart.bind(this)), this.$container.on("variantImageChange" + this.settings.namespace, this._updateImages.bind(this)), this.$container.on("variantPriceChange" + this.settings.namespace, this._updatePrice.bind(this)), this.$container.on("variantSKUChange" + this.settings.namespace, this._updateSKU.bind(this))
        },
        _updateAddToCart: function(e) {
            var t = e.variant;
            t ? ($(this.selectors.productPrices).removeClass("invisible").attr("aria-hidden", "true"), $(".variations_button").removeClass("hide"), t.available ? ($(this.selectors.addToCart).prop("disabled", !1).toggleClass("hide", !1), $(this.selectors.addToCart).val(theme.strings.addToCart), $(this.selectors.stockText).html(theme.strings.inStock).removeClass("out-of-stock unavailable").addClass("in-stock"), "shopify" == t.inventory_management && "continue" != t.inventory_policy && (0 < t.inventory_quantity && 1 == parseInt(theme.inventory) ? $(this.selectors.stockText).html(t.inventory_quantity + " " + theme.strings.inStock) : $(this.selectors.stockText).html(theme.strings.inStock))) : ($(this.selectors.addToCart).prop("disabled", !0).toggleClass("hide", !1), $(this.selectors.addToCart).val(theme.strings.soldOut), $(this.selectors.stockText).html(theme.strings.outStock).removeClass("in-stock unavailable").addClass("out-of-stock"))) : ($(".variations_button").addClass("hide"), $(this.selectors.addToCart).prop("disabled", !0).toggleClass("hide", !0), $(this.selectors.addToCart).val(theme.strings.unavailable), $(this.selectors.stockText).html(theme.strings.unavailable).removeClass("in-stock").addClass("out-of-stock unavailable"), $(this.selectors.productPrices).addClass("invisible").attr("aria-hidden", "false"))
        },
        _updateImages: function(e) {
            var t = e.variant,
                a = this,
                o = this.settings.product_design,
                r = t.featured_image.src.replace("https:", "").replace("http:", "").split("?v=")[0];
            console.log(1), $(this.selectors.productFeaturedImage).each(function() {
                console.log(2);
                var e = $(this),
                    t = e.attr("href");
                if (0 <= t.indexOf(r) && !e.closest(".slick-slide").hasClass("slick-cloned")) {
                    console.log(3);
                    var n = $(a.selectors.productMainImages),
                        s = e.closest(".slick-slide").attr("data-slick-index");
                    if (console.log("pos: " + s), "carousel" == o ? n.slick("slickGoTo", s) : (console.log(4), n.slick("slickGoTo", s, !0)), "scroll" == o) {
                        var l = parseInt(e.closest(".shopify-product-gallery__image").offset().top) - 50;
                        $("html,body").animate({
                            scrollTop: l
                        }, "slow")
                    }
                    return void("gallery" == o && 0 < $(".thumbnails .thumbnail-gallery-item").length && $(".thumbnails .thumbnail-gallery-item").each(function() {
                        var e = $(this).data("href");
                        0 <= e.indexOf(r) && $(this).trigger("click")
                    }))
                }
            })
        },
        _updatePrice: function(e) {
            var t = e.variant;
            if ($(this.selectors.originalPrice).html("<span class=\"money\">" + theme.Currency.formatMoney(t.price, theme.settings.moneyFormat) + "</span>"), t.compare_at_price > t.price) {
                if ($(this.selectors.productPrices).addClass("has-sale"), $(this.selectors.productPrices).removeClass("not-sale"), $(this.selectors.comparePrice).html("<span class=\"money\">" + theme.Currency.formatMoney(t.compare_at_price, theme.settings.moneyFormat) + "</span>").removeClass("hide"), $(this.selectors.saleLabel).find("span").text(theme.strings.sale), "" != theme.sale_percentages) {
                    var a = Math.round(100 * (t.compare_at_price - t.price) / t.compare_at_price);
                    $(this.selectors.saleLabel).find("span").text("-" + a + "%")
                }
                $(this.selectors.saleLabel).addClass("hide")
            } else $(this.selectors.productPrices).removeClass("has-sale"), $(this.selectors.productPrices).addClass("not-sale"), $(this.selectors.comparePrice).addClass("hide"), $(this.selectors.saleLabel).addClass("hide");
            theme.CurrencyPicker.convert(this.selectors.product + " .money")
        },
        _updateSKU: function(e) {
            var t = e.variant;
            "" == t.sku ? $(this.selectors.SKU).addClass("hide") : $(this.selectors.SKU).removeClass("hide").find(".sku").text(t.sku)
        },
        onUnload: function() {
            this.$container.off(this.settings.namespace)
        }
    }), e
}(), window.theme = window.theme || {}, theme.Filters = function() {
    function e() {
        $(a.filter).length && ($(a.fiterTarget).html(""), $(a.filter).clone().appendTo(a.fiterTarget), $(".offcanvas_shop_sidebar").fitVids())
    }

    function t(t) {
        var o = this.$container = $(t);
        this.$filterSelect = $(a.filter, o), this.$sortSelect = $(a.sortSelection, o), this.$viewSelect = $(a.defaultView, o), this.$filterClear = $(a.filterClear, o), e(), $(document).on("change", a.viewSelection, this._onViewChange.bind(this)), $(document).on("change", a.sortSelection, this._onSortChange.bind(this)), $(document).on("change", a.filterSelection, this._onFilterChange.bind(this)), $(document).on("click", a.filterClear, this._onFilterClear.bind(this))
    }
    var a = {
        sortSelection: ".filters-toolbar__input--sort",
        defaultSort: ".collection-header__default-sort",
        viewSelection: ".filters-toolbar__input--view",
        defaultView: ".collection-header__default-view",
        filter: ".shop-page #secondary",
        fiterTarget: ".offcanvas_aside_left .offcanvas_shop_sidebar .widget-area",
        filterSelection: ".mfilter-content .filter",
        filterClear: ".mfilter-content .clear"
    };
    return t.prototype = _.assignIn({}, t.prototype, {
        _filterAjaxClick: function(e) {
            delete Shopify.queryParams.page;
            var t = this._filterCreateUrl(e);
            this._filterGetContent(t)
        },
        _filterCreateUrl: function(e) {
            var t = $.param(Shopify.queryParams).replace(/%2B/g, "+");
            return e ? "" == t ? e : e + "?" + t : location.pathname + "?" + t
        },
        _filterGetContent: function(e) {
            var t = ".mfilter-box .mfilter-content",
                a = this;
            $.ajax({
                type: "get",
                url: e,
                beforeSend: function() {
                    roar.destroyCountdown(), $("body").addClass("is_loading").removeClass("open_filter")
                },
                success: function(a) {
                    var o = $(a).filter("title").text();
                    $("#mfilter-content-container").empty().html($(a).find("#mfilter-content-container").html()), $(t).empty().html($(a).find(t).html()), History.pushState({
                        param: Shopify.queryParams
                    }, o, e), setTimeout(function() {
                        $("html,body").animate({
                            scrollTop: $("body #sandbox").offset().top
                        }, 500, "swing")
                    }, 100), $("body").removeClass("is_loading"), roar.mapPaginationCallback()
                },
                error: function() {
                    $("body").removeClass("is_loading")
                }
            })
        },
        _mapReviews: function() {
            "undefined" != typeof SPR && (SPR.registerCallbacks(), SPR.initRatingHandler(), SPR.initDomEls(), SPR.loadProducts(), SPR.loadBadges())
        },
        _onFilterClear: function(e) {
            var t = [];
            Shopify.queryParams.constraint && (t = Shopify.queryParams.constraint.split("+"));
            var a = $(e.currentTarget),
                o = a.closest(".column").find("input:checked");
            0 < o.length && o.each(function() {
                var e = $(this).val();
                if (e) {
                    var a = t.indexOf(e);
                    0 <= a && t.splice(a, 1)
                }
            }), t.length ? Shopify.queryParams.constraint = t.join("+") : delete Shopify.queryParams.constraint, this._filterAjaxClick()
        },
        _onViewChange: function(e) {
            var t = $(e.currentTarget),
                o = $(a.defaultView, this.$container).val(),
                r = t.val() ? t.val() : o;
            Shopify.queryParams.view = r, this._filterAjaxClick()
        },
        _onSortChange: function(e) {
            var t = $(e.currentTarget),
                o = $(a.defaultSort, this.$container).val(),
                r = t.val() ? t.val() : o;
            Shopify.queryParams.sort_by = r, this._filterAjaxClick()
        },
        _onFilterChange: function(e) {
            var t = $(e.currentTarget),
                a = t.closest(".column").attr("data-multi_choice"),
                o = [];
            if (Shopify.queryParams.constraint && (o = Shopify.queryParams.constraint.split("+")), "false" == a && !t.closest(".field").hasClass("active")) {
                var r = t.closest(".column").find("input:checked");
                0 < r.length && r.each(function() {
                    var e = $(this).val();
                    if (e) {
                        var t = o.indexOf(e);
                        0 <= t && o.splice(t, 1)
                    }
                })
            }
            var n = t.val();
            if (n) {
                console.log(o);
                var s = o.indexOf(n);
                0 <= s ? (console.log(n), o.splice(s, 1)) : o.push(n)
            }
            o.length ? Shopify.queryParams.constraint = o.join("+") : delete Shopify.queryParams.constraint, this._filterAjaxClick()
        },
        onUnload: function() {
            this.$sortSelect.off("change", this._onSortChange), this.$filterSelect.off("change", this._onFilterChange), this.$filterClear.off("click", this._onFilterClear)
        }
    }), t
}(), theme.MegaMenuSection = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.MegaMenu = $("#megamenu-" + a), this.megaMenuNamspace = "#megamenu-" + a, this.megaMenuId = $("#shopify-section-" + a), 0 < $(".section-megamenu-content").length && $(".section-megamenu-content").each(function() {
            var e = $(this).data("menu_width_class");
            0 < $(this).closest(".shopify-section").length && (!$(this).closest(".shopify-section").hasClass(e) && $(this).closest(".shopify-section").addClass(e), $(this).closest(".shopify-section").removeClass("hidden"))
        }), 0 < $("#header-phantom .shopify-section").length && $("#header-phantom .shopify-section").each(function() {
            $(this).removeClass("shopify-section")
        }), this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            roar.fixedHeaderMenu(), this._products(), this._handleMegaMenu(), this._handleVermenuCategory()
        },
        _products: function() {
            0 < $(".products-carousel-megamenu").length && $(".products-carousel-megamenu").each(function() {
                var e = $(this).data("_id"),
                    a = $(this).data("_one"),
                    t = $(this).data("_two"),
                    o = $(this).data("_three"),
                    r = $(this).data("_four"),
                    n = $("#productsCarousel" + e);
                n.not(".slick-initialized").slick({
                    arrows: !1,
                    slidesToShow: r,
                    slidesToScroll: r,
                    responsive: [{
                        breakpoint: 1920,
                        settings: {
                            slidesToShow: r,
                            slidesToScroll: r
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: o,
                            slidesToScroll: o
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: t,
                            slidesToScroll: t
                        }
                    }],
                    rtl: window.rtl
                }), $(".productsCarousel" + e + "_next").click(function() {
                    return n.slick("slickNext"), !1
                }), $(".productsCarousel" + e + "_prev").click(function() {
                    return n.slick("slickPrev"), !1
                }), $(window).resize(function() {
                    n.slick("setPosition")
                })
            })
        },
        _handleVermenuCategory: function() {
            if ($("#vermenu_cat_gap").length && 992 <= roar.getWidthBrowser() && 0 < $(".container-megamenu.vertical .megamenu-wrapper").length) {
                var e = $(".container-megamenu.vertical .megamenu-wrapper").outerHeight(),
                    t = $(".container-megamenu.vertical .megamenu-wrapper").offset().top,
                    a = $("#sidebar").offset().top;
                $("#vermenu_cat_gap").css("height", e - (a - t))
            }
        },
        _handleMegaMenu: function() {
            var e = this._handleVermenuCategory();
            "yes" == window.megamenu_responsive_design && 992 > $(window).width() && (window.megamenu_responsive = !0), $("ul.megamenu > li").each(function() {
                var e = 0;
                $(this).find(".mobile-enabled").each(function() {
                    e++
                }), 0 == e && $(this).find(".open-menu").addClass("mobile-disabled")
            }), $("ul.megamenu li .sub-menu .content .hover-menu ul li").hover(function() {
                $(this).children("ul").addClass("active")
            }, function() {
                $(this).children("ul").removeClass("active")
            }), $(".close-categories").unbind("click"), $(".close-categories").on("click", function() {
                return $(this).parent().removeClass("active"), $(this).next().animate({
                    height: "hide"
                }, 400), !1
            }), $(".open-categories").unbind("click"), $(".open-categories").on("click", function() {
                return $(".open-categories").parent().removeClass("active"), $(".open-categories").next().next().animate({
                    height: "hide"
                }, 400), $(this).parent().addClass("active"), $(this).next().next().animate({
                    height: "show"
                }, 400), !1
            }), $(".close-menu").unbind("click"), $(".close-menu").on("click", function() {
                return $(this).parent().removeClass("active"), $(this).next().next().next().animate({
                    height: "hide"
                }, 400), !1
            }), $(".open-menu").unbind("click"), $(".open-menu").on("click", function() {
                return $("ul.megamenu > li").removeClass("active"), $("ul.megamenu > li").find(".sub-menu").animate({
                    height: "hide"
                }, 400), $(this).parent().addClass("active"), $(this).next().next().animate({
                    height: "show"
                }, 400), $(window).trigger("resize"), window.megamenu_responsive = !0, !1
            }), $("ul.megamenu > li.click .content a").unbind("click"), $("ul.megamenu > li.click .content a").click(function() {
                window.location = $(this).attr("href")
            }), jQuery(window).resize(function() {
                $("ul.megamenu > li.hover").hover(function() {
                    if (0 == window.megamenu_responsive) {
                        if (window.megamenu_active = $(this), window.megamenu_hover = !0, $("ul.megamenu > li").removeClass("active"), $(this).addClass("active"), window.rtl) {
                            $(this).children(".sub-menu").css("right", "auto"), $(this).children(".sub-menu").css("left", "auto");
                            var t = $(this).children(".sub-menu"),
                                o = t.offset().left,
                                r = $(".horizontal ul.megamenu"),
                                n = r.offset().left - 45;
                            n > o && $(this).children(".sub-menu").css("left", "0")
                        } else {
                            $(this).children(".sub-menu").css("right", "auto");
                            var t = $(this).children(".sub-menu"),
                                o = $(window).width() - (t.offset().left + t.outerWidth());
                            if ($(".header-type-3").length || $(".header-type-30").length) var r = $("#top .container"),
                                n = $(window).width() - (r.offset().left + r.outerWidth());
                            else var r = $(".overflow-megamenu"),
                                n = $(window).width() - (r.offset().left + r.outerWidth());
                            n > o && $(this).children(".sub-menu").css("right", "0")
                        }
                        var s = $(this).children("a").outerWidth() / 2,
                            e = $(this).children("a").offset().left - $(this).find(".content").offset().left;
                        $(this).find(".content > .arrow").css("left", e + s)
                    }
                }, function() {
                    if (0 == window.megamenu_responsive) {
                        var e = $(this).attr("title");
                        if (window.megamenu_hover = !1, "hover-intent" == e) {
                            var t = $(this);
                            setTimeout(function() {
                                0 == window.megamenu_hover && $(t).removeClass("active")
                            }, 500)
                        } else $(this).removeClass("active")
                    }
                })
            }).resize(), $("ul.megamenu > li.click").unbind("click"), $("ul.megamenu > li.click").click(function() {
                if (1 == $(this).removeClass("active")) return !1;
                if (window.megamenu_active = $(this), window.megamenu_hover = !0, $("ul.megamenu > li").removeClass("active"), $(this).addClass("active"), 1 == window.megamenu_responsive && $(this).children(".sub-menu").animate({
                        height: "show"
                    }, 400), window.rtl) {
                    $(this).children(".sub-menu").css("right", "auto"), $(this).children(".sub-menu").css("left", "auto");
                    var t = $(this).children(".sub-menu"),
                        o = t.offset().left,
                        r = $(".horizontal ul.megamenu"),
                        n = r.offset().left - 45;
                    n > o && $(this).children(".sub-menu").css("left", "0")
                } else {
                    $(this).children(".sub-menu").css("right", "auto");
                    var t = $(this).children(".sub-menu"),
                        o = $(window).width() - (t.offset().left + t.outerWidth());
                    if ($(".header-type-3").length) var r = $("#top .container"),
                        n = $(window).width() - (r.offset().left + r.outerWidth());
                    else var r = $(".overflow-megamenu"),
                        n = $(window).width() - (r.offset().left + r.outerWidth());
                    n > o && $(this).children(".sub-menu").css("right", "0")
                }
                var s = $(this).children("a").outerWidth() / 2,
                    e = $(this).children("a").offset().left - $(this).find(".content").offset().left;
                return $(this).find(".content > .arrow").css("left", e + s), !1
            }), $(".categories-image-right ul > li > a").hover(function() {
                $(this).closest(".categories-image-right").find("img").attr("src", $(this).attr("data-image"))
            }, function() {
                var e = $(this).closest(".categories-image-right").attr("data-image");
                $(this).closest(".categories-image-right").find("img").attr("src", e)
            }), $(".megaMenuToggle").unbind("click"), $(".megaMenuToggle").click(function() {
                return 1 == $(this).removeClass("active") ? $(this).parent().find(".megamenu-wrapper").stop(!0, !0).animate({
                    height: "hide"
                }, 400) : ($(this).parent().find(".megamenu-wrapper").stop(!0, !0).animate({
                    height: "toggle"
                }, 400), $(this).addClass("active")), !1
            }), $("html").unbind("click"), $("html").on("click", function() {
                "yes" == window.megamenu_responsive_design && 992 > $(window).width() || $("ul.megamenu > li.click").removeClass("active")
            }), e, $(window).resize(function() {
                window.megamenu_responsive = !1, "yes" == window.megamenu_responsive_design && 992 > $(window).width() && (window.megamenu_responsive = !0), e
            }), roar.initLazyLoading(".section-megamenu-content", !0)
        },
        onUnload: function() {
            this.$container.off(this.megaMenuNamspace)
        },
        onSelect: function() {
            0 < $(this.megaMenuNamspace + " .product-grid.rich-banner").length && roar.initCountdown(), roar.initProductQuickShopItem(this.megaMenuNamspace + " .product-grid.rich-banner"), roar.handleQuickshop(this.megaMenuNamspace + " .product-grid.rich-banner")
        },
        onBlockSelect: function() {},
        onBlockDeselect: function() {}
    }), e
}(), theme.TopBlockSection = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.topBlockId = $("#shopify-section-" + a), this.topBlock = $("#top-block-" + a), this.topBlockNamspace = "#top-block-wrapper-" + a, this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {},
        onUnload: function() {
            this.$container.off(this.topBlockNamspace)
        }
    }), e
}(), theme.CustomWidgetSection = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.customWidgetId = $("#shopify-section-" + a), this.customWidgetNamspace = "#custom-widget-" + a, this.placement_fullwidth = $(this.customWidgetNamspace).data("placement_fullwidth"), this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            if ("1" == this.placement_fullwidth && !window.sidebar) {
                var e = this.sectionId;
                onFullWidthOption(e)
            }
        },
        onUnload: function() {
            this.$container.off(this.customWidgetNamspace)
        }
    }), e
}(), theme.BannerSection = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.bannerId = $("#shopify-section-" + a), this.bannerNamspace = "#rich-banners-" + a, this.placement_fullwidth = $(this.bannerNamspace).data("placement_fullwidth"), this.placement_background = $(this.bannerNamspace).data("placement_background"), this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            if ("1" == this.placement_fullwidth && !window.sidebar) {
                var e = this.sectionId;
                onFullWidthOption(e)
            }
            this._initFx(), this._handleFontSize(), this._initSlider(), this._initTilt(), "1" == this.placement_background && this._initBackground()
        },
        _initBackground: function() {
            var e = $("#shopify-section-" + this.sectionId),
                t = this.$container.data("placement_background_c"),
                a = this.$container.data("placement_background_i");
            $(window).resize(function() {
                if (e.removeAttr("style"), !(768 > $(window).width())) {
                    var o = e.offset();
                    e.width($("body").width()), e.css("left", "-" + o.left + "px").css("padding-left", o.left).css("padding-right", o.left), e.css("background-color", t).css("background-image", "url(" + a + ")").css("background-size", "cover")
                }
            }).resize()
        },
        _initTilt: function() {
            var e = this.$container.find(".rt-tilt-container");
            0 >= e.length || (e.on("mousemove", function(t) {
                "use strict";
                var e = $(this).offset().left,
                    a = $(this).offset().top,
                    o = t.pageX - e,
                    r = t.pageY - a,
                    n = $(this).width() / 2 - o,
                    s = $(this).height() / 2 - r;
                $(this).css("transform", "perspective(500px) rotateX(" + s / 40 + "deg) rotateY(" + -(n / 40) + "deg) translateZ(10px)");
                0 < Math.sign(n) ? -Math.abs(n) : Math.abs(n);
                $(this).removeClass("rt-leave")
            }), e.on("mouseleave", function() {
                $(this).addClass("rt-leave")
            }))
        },
        _initSlider: function() {
            this.$container.find(".rich-banner--group.is-slider").each(function(e, t) {
                var a = {
                        interval: $(t).data("interval"),
                        autoplay: $(t).data("autoplay"),
                        itemsperslide: $(t).data("itemsperslide"),
                        blockid: $(t).data("blockid"),
                        variablewidth: $(t).data("variablewidth")
                    },
                    o = $(t).not(".slick-initialized");
                o.slick({
                    dots: !1,
                    arrows: !1,
                    slidesToShow: a.itemsperslide,
                    slidesToScroll: 1,
                    autoplay: a.autoplay,
                    autoplaySpeed: a.interval,
                    slide: "div, a.rich-banner-wrapper",
                    variableWidth: a.variablewidth,
                    centerMode: a.variablewidth
                }), $(t).find(".next-button").first().click(function() {
                    return o.slick("slickNext"), !1
                }), $(t).find(".prev-button").first().click(function() {
                    return o.slick("slickPrev"), !1
                }), roar.initLazyLoading("#rich-banner--group" + a.blockid, !0)
            })
        },
        _initFx: function() {
            this.$container.find(".rich-banner.has-text-fx").each(function(e, t) {
                var a = {
                    used: $(t).data("fx"),
                    type: $(t).data("fx-type")
                };
                !0 == a.used && ("0" == a.type ? anime.timeline({
                    loop: !0
                }).add({
                    targets: $(t).find(".rt-fx-dominos .letter").toArray(),
                    rotateY: [-90, 0],
                    duration: 1300,
                    delay: function(e, t) {
                        return 45 * t
                    }
                }).add({
                    targets: $(t).find(".rt-fx-dominos").toArray(),
                    opacity: 0,
                    duration: 1e3,
                    easing: "easeOutExpo",
                    delay: 1e3
                }) : "1" == a.type ? anime.timeline({
                    loop: !0
                }).add({
                    targets: $(t).find(".rt-fx-vertical-lines .letter").toArray(),
                    scale: [.3, 1],
                    opacity: [0, 1],
                    translateZ: 0,
                    easing: "easeOutExpo",
                    duration: 600,
                    delay: function(e, t) {
                        return 70 * (t + 1)
                    }
                }).add({
                    targets: $(t).find(".rt-fx-vertical-lines .line").toArray(),
                    scaleX: [0, 1],
                    opacity: [.5, 1],
                    easing: "easeOutExpo",
                    duration: 700,
                    offset: "-=875",
                    delay: function(e, t, a) {
                        return 80 * (a - t)
                    }
                }).add({
                    targets: $(t).find(".rt-fx-vertical-lines").toArray(),
                    opacity: 0,
                    duration: 1e3,
                    easing: "easeOutExpo",
                    delay: 1e3
                }) : "2" == a.type ? anime.timeline({
                    loop: !0
                }).add({
                    targets: $(t).find(".rt-fx-fading .letter").toArray(),
                    opacity: [0, 1],
                    easing: "easeInOutQuad",
                    duration: 2250,
                    delay: function(e, t) {
                        return 150 * (t + 1)
                    }
                }).add({
                    targets: $(t).find(".rt-fx-fading").toArray(),
                    opacity: 0,
                    duration: 1e3,
                    easing: "easeOutExpo",
                    delay: 1e3
                }) : "3" == a.type ? anime.timeline({
                    loop: !0
                }).add({
                    targets: $(t).find(".rt-fx-intro .letter").toArray(),
                    translateX: [40, 0],
                    translateZ: 0,
                    opacity: [0, 1],
                    easing: "easeOutExpo",
                    duration: 1200,
                    delay: function(e, t) {
                        return 500 + 30 * t
                    }
                }).add({
                    targets: $(t).find(".rt-fx-intro .letter").toArray(),
                    translateX: [0, -30],
                    opacity: [1, 0],
                    easing: "easeInExpo",
                    duration: 1100,
                    delay: function(e, t) {
                        return 100 + 30 * t
                    }
                }) : "4" == a.type ? anime.timeline({
                    loop: !0
                }).add({
                    targets: $(t).find(".rt-fx-surprising .word").toArray(),
                    scale: [14, 1],
                    opacity: [0, 1],
                    easing: "easeOutCirc",
                    duration: 800,
                    delay: function(e, t) {
                        return 800 * t
                    }
                }).add({
                    targets: $(t).find(".rt-fx-surprising").toArray(),
                    opacity: 0,
                    duration: 1e3,
                    easing: "easeOutExpo",
                    delay: 1e3
                }) : anime.timeline({
                    loop: !0
                }).add({
                    targets: $(t).find(".rt-fx-typing .line").toArray(),
                    scaleY: [0, 1],
                    opacity: [.5, 1],
                    easing: "easeOutExpo",
                    duration: 700
                }).add({
                    targets: $(t).find(".rt-fx-typing .line").toArray(),
                    translateX: [0, $(t).find(".rt-fx-typing .letters").first().width()],
                    easing: "easeOutExpo",
                    duration: 700,
                    delay: 100
                }).add({
                    targets: $(t).find(".rt-fx-typing .letter").toArray(),
                    opacity: [0, 1],
                    easing: "easeOutExpo",
                    duration: 600,
                    offset: "-=775",
                    delay: function(e, t) {
                        return 34 * (t + 1)
                    }
                }).add({
                    targets: $(t).find(".rt-fx-typing").toArray(),
                    opacity: 0,
                    duration: 1e3,
                    easing: "easeOutExpo",
                    delay: 1e3
                }))
            })
        },
        _handleFontSize: function() {
            var e = this.$container;
            $(window).resize(function() {
                var t = parseInt($(window).width());
                e.find(".self-fontsize-adj").each(function() {
                    if ($(this).css("fontSize", $(this).data("oriFontsize")), 767 >= t) {
                        var e = parseInt($(this).data("oriFontsize")) / 2;
                        e = 10 > e ? 10 : e, $(this).css("fontSize", e + "px")
                    }
                }), e.find("a.self-fontsize-adj").each(function() {
                    $(this).css("fontSize", $(this).data("oriFontsize"))
                }), 767 >= t ? (e.find("a.self-fontsize-adj").css("fontSize", ""), e.find("a.self-fontsize-adj").css("padding", "7px 19px 5px")) : e.find("a.self-fontsize-adj").css("padding", "")
            }).resize()
        },
        onUnload: function() {
            this.$container.off(this.bannerNamspace)
        },
        onBlockSelect: function(e) {
            console.log(e)
        },
        onSelect: function() {
            0 < $(this.bannerNamspace + " .product-grid.rich-banner").length && roar.initCountdown(), roar.initLazyLoading(this.bannerNamspace + " .product-grid.rich-banner", !0), roar.initProductQuickShopItem(this.bannerNamspace + " .product-grid.rich-banner"), roar.handleQuickshop(this.bannerNamspace + " .product-grid.rich-banner")
        }
    }), e
}(), theme.DeliveryBarSection = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.deliveryBarId = $("#shopify-section-" + a), this.deliveryBar = $("#delivery-bar-" + a), this.deliveryBarNamspace = "#delivery-bar-" + a, this.placement_fullwidth = $(this.deliveryBarNamspace).data("placement_fullwidth"), this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            if ("1" == this.placement_fullwidth && !window.sidebar) {
                var e = this.sectionId;
                onFullWidthOption(e)
            }
        },
        onUnload: function() {
            this.$container.off(this.deliveryBarNamspace)
        }
    }), e
}(), theme.SlideShowSection = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.slideShowId = $("#shopify-section-" + a), this.slideShow = $("#home-slider-" + a), this.slideShowNamspace = "#home-slider-" + a, this.option = {
            slider_auto: this.slideShow.data("slider_auto"),
            slider_interval: this.slideShow.data("slider_interval"),
            slider_scale: this.slideShow.data("slider_scale"),
            slider_auto_height: this.slideShow.data("slider_auto_height"),
            slider_height: this.slideShow.data("slider_height"),
            slider_align_top: this.slideShow.data("slider_align_top"),
            is_header_slider: this.slideShow.data("is_header_slider"),
            full_width: this.slideShow.data("full_width"),
            is_megamenu: this.slideShow.data("is_megamenu")
        }, this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            if ("1" == this.option.is_header_slider && ("1" == this.option.slider_align_top ? $(".templateIndex").addClass("slider-align-top") : $(".templateIndex").removeClass("slider-align-top")), this._handleSlideshow(), this._initResize(), "1" == this.option.full_width && !window.sidebar) {
                var e = this.sectionId;
                onFullWidthOption(e)
            }
            "1" == this.option.is_megamenu && this._handleMegaMenu()
        },
        _handleVermenuCategory: function() {
            if ($("#vermenu_cat_gap").length && 992 <= roar.getWidthBrowser() && 0 < $(".container-megamenu.vertical .megamenu-wrapper").length) {
                var e = $(".container-megamenu.vertical .megamenu-wrapper").outerHeight(),
                    t = $(".container-megamenu.vertical .megamenu-wrapper").offset().top,
                    a = $("#sidebar").offset().top;
                $("#vermenu_cat_gap").css("height", e - (a - t))
            }
        },
        _handleMegaMenu: function() {
            var e = this._handleVermenuCategory();
            "yes" == window.megamenu_responsive_design && 992 > $(window).width() && (window.megamenu_responsive = !0), $("ul.megamenu > li").each(function() {
                var e = 0;
                $(this).find(".mobile-enabled").each(function() {
                    e++
                }), 0 == e && $(this).find(".open-menu").addClass("mobile-disabled")
            }), $("ul.megamenu li .sub-menu .content .hover-menu ul li").hover(function() {
                $(this).children("ul").addClass("active")
            }, function() {
                $(this).children("ul").removeClass("active")
            }), $(".close-categories").unbind("click"), $(".close-categories").on("click", function() {
                return $(this).parent().removeClass("active"), $(this).next().animate({
                    height: "hide"
                }, 400), !1
            }), $(".open-categories").unbind("click"), $(".open-categories").on("click", function() {
                return $(".open-categories").parent().removeClass("active"), $(".open-categories").next().next().animate({
                    height: "hide"
                }, 400), $(this).parent().addClass("active"), $(this).next().next().animate({
                    height: "show"
                }, 400), !1
            }), $(".close-menu").unbind("click"), $(".close-menu").on("click", function() {
                return $(this).parent().removeClass("active"), $(this).next().next().next().animate({
                    height: "hide"
                }, 400), !1
            }), $(".open-menu").unbind("click"), $(".open-menu").on("click", function() {
                return $("ul.megamenu > li").removeClass("active"), $("ul.megamenu > li").find(".sub-menu").animate({
                    height: "hide"
                }, 400), $(this).parent().addClass("active"), $(this).next().next().animate({
                    height: "show"
                }, 400), $(window).trigger("resize"), window.megamenu_responsive = !0, !1
            }), $("ul.megamenu > li.click .content a").unbind("click"), $("ul.megamenu > li.click .content a").click(function() {
                window.location = $(this).attr("href")
            }), $("ul.megamenu > li.hover").hover(function() {
                if (0 == window.megamenu_responsive) {
                    if (window.megamenu_active = $(this), window.megamenu_hover = !0, $("ul.megamenu > li").removeClass("active"), $(this).addClass("active"), window.rtl) {
                        $(this).children(".sub-menu").css("right", "auto"), $(this).children(".sub-menu").css("left", "auto");
                        var t = $(this).children(".sub-menu"),
                            o = t.offset().left,
                            r = $(".horizontal ul.megamenu"),
                            n = r.offset().left - 45;
                        n > o && $(this).children(".sub-menu").css("left", "0")
                    } else {
                        $(this).children(".sub-menu").css("right", "auto");
                        var t = $(this).children(".sub-menu"),
                            o = $(window).width() - (t.offset().left + t.outerWidth());
                        if ($(".header-type-3").length) var r = $("#top .container"),
                            n = $(window).width() - (r.offset().left + r.outerWidth());
                        else var r = $(".overflow-megamenu"),
                            n = $(window).width() - (r.offset().left + r.outerWidth());
                        n > o && $(this).children(".sub-menu").css("right", "0")
                    }
                    var s = $(this).children("a").outerWidth() / 2,
                        e = $(this).children("a").offset().left - $(this).find(".content").offset().left;
                    $(this).find(".content > .arrow").css("left", e + s)
                }
            }, function() {
                if (0 == window.megamenu_responsive) {
                    var e = $(this).attr("title");
                    if (window.megamenu_hover = !1, "hover-intent" == e) {
                        var t = $(this);
                        setTimeout(function() {
                            0 == window.megamenu_hover && $(t).removeClass("active")
                        }, 500)
                    } else $(this).removeClass("active")
                }
            }), $("ul.megamenu > li.click").unbind("click"), $("ul.megamenu > li.click").click(function() {
                if (1 == $(this).removeClass("active")) return !1;
                if (window.megamenu_active = $(this), window.megamenu_hover = !0, $("ul.megamenu > li").removeClass("active"), $(this).addClass("active"), 1 == window.megamenu_responsive && $(this).children(".sub-menu").animate({
                        height: "show"
                    }, 400), window.rtl) {
                    $(this).children(".sub-menu").css("right", "auto"), $(this).children(".sub-menu").css("left", "auto");
                    var t = $(this).children(".sub-menu"),
                        o = t.offset().left,
                        r = $(".horizontal ul.megamenu"),
                        n = r.offset().left - 45;
                    n > o && $(this).children(".sub-menu").css("left", "0")
                } else {
                    $(this).children(".sub-menu").css("right", "auto");
                    var t = $(this).children(".sub-menu"),
                        o = $(window).width() - (t.offset().left + t.outerWidth());
                    if ($(".header-type-3").length) var r = $("#top .container"),
                        n = $(window).width() - (r.offset().left + r.outerWidth());
                    else var r = $(".overflow-megamenu"),
                        n = $(window).width() - (r.offset().left + r.outerWidth());
                    n > o && $(this).children(".sub-menu").css("right", "0")
                }
                var s = $(this).children("a").outerWidth() / 2,
                    e = $(this).children("a").offset().left - $(this).find(".content").offset().left;
                return $(this).find(".content > .arrow").css("left", e + s), !1
            }), $(".categories-image-right ul > li > a").hover(function() {
                $(this).closest(".categories-image-right").find("img").attr("src", $(this).attr("data-image"))
            }, function() {
                var e = $(this).closest(".categories-image-right").attr("data-image");
                $(this).closest(".categories-image-right").find("img").attr("src", e)
            }), $(".megaMenuToggle").unbind("click"), $(".megaMenuToggle").click(function() {
                return 1 == $(this).removeClass("active") ? $(this).parent().find(".megamenu-wrapper").stop(!0, !0).animate({
                    height: "hide"
                }, 400) : ($(this).parent().find(".megamenu-wrapper").stop(!0, !0).animate({
                    height: "toggle"
                }, 400), $(this).addClass("active")), !1
            }), $("html").unbind("click"), $("html").on("click", function() {
                "yes" == window.megamenu_responsive_design && 992 > $(window).width() || $("ul.megamenu > li.click").removeClass("active")
            }), e, $(window).resize(function() {
                window.megamenu_responsive = !1, "yes" == window.megamenu_responsive_design && 992 > $(window).width() && (window.megamenu_responsive = !0), e
            })
        },
        _handleSlideshow: function() {
            var t, o, r, n, s, l, p, u;
            if (this.slideShow.length) {
                var m = this.slideShow;
                t = m.data("afx-head"), o = m.data("afx-cap"), r = m.data("afx-cta"), n = m.data("afx-sticker"), s = m.data("dfx-head"), l = m.data("dfx-cap"), p = m.data("dfx-cta"), u = m.data("dfx-sticker")
            }
            var v, y = this.slideShowNamspace,
                w = this.option.slider_auto,
                C = this.option.slider_interval,
                x = this.option.slider_scale,
                S = this;
            this.slideShow.length && (v = this.slideShow.flexslider({
                animation: "fade",
                prevText: "",
                nextText: "",
                controlNav: !1,
                directionNav: !1,
                slideshowSpeed: C,
                slideshow: w,
                controlNav: !1,
                start: function() {
                    jQuery("body").removeClass("loading"), jQuery(y + " ul.slides h2.caption-content").css("opacity", "0"), jQuery(y + " ul.slides .real-caption").css("opacity", "0"), jQuery(y + " ul.slides .caption-link").css("opacity", "0"), jQuery(y + " ul.slides .slide-sticker-wrapper img").css("opacity", "0"), jQuery(y + " ul.slides li:nth-child(1) h2.caption-content").css("opacity", "1.0").addClass("rt-animated " + t).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + t)
                    }), jQuery(y + " ul.slides li:nth-child(1) .real-caption").css("opacity", "1.0").addClass("rt-animated " + o).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + o)
                    }), jQuery(y + " ul.slides li:nth-child(1) .caption-link").css("opacity", "1.0").addClass("rt-animated " + r).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + r)
                    }), jQuery(y + " ul.slides li:nth-child(1) .slide-sticker-wrapper img").css("opacity", "1.0").addClass("rt-animated " + n).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + n)
                    })
                },
                after: function(a) {
                    var e = parseInt(a.currentSlide, 10) + 1;
                    jQuery(y + " ul.slides li:nth-child(" + e + ") h2.caption-content").css("opacity", "1.0").addClass("rt-animated " + t).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + t)
                    }), jQuery(y + " ul.slides li:nth-child(" + e + ") .real-caption").css("opacity", "1.0").addClass("rt-animated " + o).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + o)
                    }), jQuery(y + " ul.slides li:nth-child(" + e + ") .caption-link").css("opacity", "1.0").addClass("rt-animated " + r).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + r)
                    }), jQuery(y + " ul.slides li:nth-child(" + e + ") .slide-sticker-wrapper img").css("opacity", "1.0").addClass("rt-animated " + n).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + n)
                    })
                },
                before: function(e) {
                    var t = parseInt(e.currentSlide, 10) + 1;
                    jQuery(y + " ul.slides li:nth-child(" + t + ") h2.caption-content").addClass("rt-animated " + s).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + s).css("opacity", "0")
                    }), jQuery(y + " ul.slides li:nth-child(" + t + ") .real-caption").addClass("rt-animated " + l).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + l).css("opacity", "0")
                    }), jQuery(y + " ul.slides li:nth-child(" + t + ") .caption-link").addClass("rt-animated " + p).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + p).css("opacity", "0")
                    }), jQuery(y + " ul.slides li:nth-child(" + t + ") .slide-sticker-wrapper img").addClass("rt-animated " + u).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + u).css("opacity", "0")
                    })
                }
            }), imagesLoaded(y, function() {
                x ? S._mockupCaptionSlider2() : S._mockupCaptionSlider()
            })), this.slideShow.find(".flex-direction-nav .flex-next").click(function(t) {
                return t.preventDefault(), t.stopPropagation(), v.flexslider("next"), !1
            }), this.slideShow.find(".flex-direction-nav .flex-prev").click(function(t) {
                return t.preventDefault(), t.stopPropagation(), v.flexslider("prev"), !1
            })
        },
        _mockupCaptionSlider2: function() {
            if (this.slideShow.length) {
                var e = this.slideShowNamspace,
                    t = roar.getWidthBrowser();
                $(e + " .slide-body").each(1200 > t ? function() {
                    var e = $(this).data("height");
                    $(this).css({
                        height: e * t / 1200
                    })
                } : function() {
                    var e = $(this).data("height");
                    $(this).css({
                        height: e
                    })
                }), $(e + " .caption-content").each(1200 > t ? function() {
                    var e = $(this).data("min"),
                        a = $(this).data("max"),
                        o = a * t / 1200;
                    e > o && (o = e), $(this).css({
                        "font-size": o
                    })
                } : function() {
                    var e = $(this).data("max");
                    $(this).css({
                        "font-size": e
                    })
                })
            }
        },
        _mockupCaptionSlider: function() {
            if (this.slideShow.length) {
                var e = this.slideShowNamspace,
                    t = this.option.slider_auto_height,
                    o = this.option.slider_height,
                    r = roar.getWidthBrowser();
                if (767 > r && 0 == t && 0 < o) {
                    $(e + " .slide-body").css("height", o * r / 1200)
                }
                767 <= r && 0 == t && 0 < o && $(e + " .slide-body").css("height", o), $(e + " .caption-content").each(767 > r ? function() {
                    var e = $(this).data("min"),
                        t = $(this).data("max"),
                        a = t;
                    50 < t && (a = 50), e > a && (a = e), $(this).css({
                        "font-size": a
                    })
                } : function() {
                    var e = $(this).data("max");
                    $(this).css({
                        "font-size": e
                    })
                })
            }
        },
        _initResize: function() {
            var e = this.option.slider_scale,
                t = this;
            jQuery(window).resize(function() {
                e ? t._mockupCaptionSlider2() : t._mockupCaptionSlider()
            })
        },
        onUnload: function() {
            this.$container.off(this.slideShowNamspace)
        }
    }), e
}(), theme.SidebarSection = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.sideBarId = $("#shopify-section-" + a), this.sideBar = $("#sidebar-" + a), this.sideBarNamspace = "#sidebar-" + a, this.tabSideBar = $(".tab-filter-tabs" + a + " a"), this.tabItem = $(".procduct_tab_item-" + a), this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            var e = this;
            0 < this.tabItem.length && this.tabItem.each(function() {
                var t = {
                    _tabcount: $(this).data("_tabcount"),
                    _ptab_carousel: $(this).data("_ptab_carousel"),
                    _id: $(this).data("_id")
                };
                0 < parseInt(t._tabcount) ? (e._initTab(), t._ptab_carousel && e._initMultiSlide(t), e._initMultiSlides(t)) : (t._ptab_carousel && e._initSlide(t), e._initSlides(t))
            })
        },
        _initTab: function() {
            this.tabSideBar.each(function() {
                $(this).click(function(t) {
                    t.preventDefault(), $(this).tab("show")
                })
            })
        },
        _initSlide: function(e) {
            var t = $(".box #myCarousel" + e._id + " .carousel-inner");
            $("#myCarousel" + e._id + "_next").click(function() {
                return t.trigger("next.owl.carousel"), !1
            }), $("#myCarousel" + e._id + "_prev").click(function() {
                return t.trigger("prev.owl.carousel"), !1
            }), t.owlCarousel({
                slideSpeed: 500,
                items: 1,
                rtl: window.rtl
            })
        },
        _initSlides: function(e) {
            var t = $(".box #myCarousel" + e._id + "s .carousel-inner");
            t.owlCarousel({
                slideSpeed: 500,
                rtl: window.rtl,
                responsive: {
                    0: {
                        items: 1
                    },
                    320: {
                        items: 1
                    },
                    479: {
                        items: 1
                    },
                    767: {
                        items: 1
                    },
                    979: {
                        items: 1
                    },
                    1199: {
                        items: 1
                    }
                }
            }), $("#myCarousel" + e._id + "s_next").click(function() {
                return t.trigger("next.owl.carousel"), !1
            }), $("#myCarousel" + e._id + "s_prev").click(function() {
                return t.trigger("prev.owl.carousel"), !1
            })
        },
        _initMultiSlide: function(e) {
            var t = $(".filter-product #myCarousel" + e._id + " .carousel-inner");
            $("#myCarousel" + e._id + "_next").click(function() {
                return t.trigger("next.owl.carousel"), !1
            }), $("#myCarousel" + e._id + "_prev").click(function() {
                return t.trigger("prev.owl.carousel"), !1
            }), t.owlCarousel({
                slideSpeed: 500,
                items: 1,
                rtl: window.rtl
            })
        },
        _initMultiSlides: function(e) {
            var t = $(".filter-product #myCarousel" + e._id + "s .carousel-inner");
            $("#myCarousel" + e._id + "s_next").click(function() {
                return t.trigger("next.owl.carousel"), !1
            }), $("#myCarousel" + e._id + "s_prev").click(function() {
                return t.trigger("prev.owl.carousel"), !1
            }), t.owlCarousel({
                slideSpeed: 500,
                rtl: window.rtl,
                responsive: {
                    0: {
                        items: 1
                    },
                    320: {
                        items: 1
                    },
                    479: {
                        items: 1
                    },
                    767: {
                        items: 1
                    },
                    979: {
                        items: 1
                    },
                    1199: {
                        items: 1
                    }
                }
            })
        },
        onUnload: function() {
            this.$container.off(this.sideBarNamspace)
        }
    }), e
}(), theme.ProductTabSection = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.productTabId = $("#shopify-section-" + a), this.productTab = $("#product-tab-" + a), this.productTabNamspace = "#product-tab-" + a, this.tabProductTabVertical = $(".tab-filter-tabs-vertical-" + a + " a"), this.tabProductTab = $(".tab-filter-tabs-" + a + " a"), this.tabItem = $(".product-tab-item-" + a), this._tabcount = this.productTab.data("_tabcount"), this.placement_fullwidth = this.productTab.data("placement_fullwidth"), this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            var e = this,
                t = this._tabcount;
            if (0 < this.tabItem.length && this.tabItem.each(function() {
                    var a = {
                        _tabcount: t,
                        _ptab_carousel: $(this).data("_ptab_carousel"),
                        _id: $(this).data("_id"),
                        _nextpage: $(this).data("_nextpage"),
                        _itemsperpage: $(this).data("_itemsperpage"),
                        _limit: parseInt($(this).data("_limit"), 10),
                        _colclass: $(this).data("_colclass"),
                        _catid: $(this).data("_catid"),
                        _all_loaded: !1,
                        _loaded_count: parseInt($(this).data("_itemsperpage"), 10)
                    };
                    e._initTab(), e._initMultiSlide(a)
                }), "1" == this.placement_fullwidth && !window.sidebar) {
                var a = this.sectionId;
                onFullWidthOption(a)
            }
        },
        _initTab: function() {
            0 < this.tabProductTab.length && this.tabProductTab.each(function() {
                $(this).click(function(t) {
                    t.preventDefault(), $(this).tab("show")
                })
            }), 0 < this.tabProductTabVertical.length && this.tabProductTabVertical.each(function() {
                $(this).click(function(t) {
                    t.preventDefault(), $(this).tab("show")
                })
            })
        },
        _initMultiSlide: function(t) {
            var a = 1,
                o = 0;
            if (t._ptab_carousel) {
                var r = $(".filter-product #myCarousel" + t._id),
                    n = $(".filter-product #myCarousel" + t._id + " .carousel-inner");
                n.slick({
                    autoplaySpeed: 500,
                    rtl: window.rtl,
                    slidesToShow: 1,
                    arrows: !1,
                    infinite: !1
                }), n.on("reInit ", function(e, t) {
                    a = t.slideCount
                }), n.on("afterChange", function(e, t) {
                    o = t.currentSlide
                }), $("#myCarousel" + t._id + "_next").click(function() {
                    return a == o + 1 && "" != t._catid && !1 == t._all_loaded && t._loaded_count < t._limit ? (console.log("There we go..."), r.addClass("b-loading"), $.ajax({
                        url: "/collections/" + t._catid,
                        type: "get",
                        dataType: "html",
                        data: {
                            view: "customlim",
                            limit: t._itemsperpage + "a" + t._colclass,
                            page: t._nextpage
                        },
                        success: function(a) {
                            var e = a.trim();
                            if ("" == e) t._all_loaded = !0;
                            else {
                                var o = $(e),
                                    s = "row-" + t._id + "-" + t._nextpage,
                                    l = o.find(".row").first().attr("id", s).children();
                                if (t._loaded_count + l.length <= t._limit) ++t._nextpage, t._loaded_count += l.length;
                                else {
                                    for (var d = t._loaded_count + l.length - t._limit, c = 0; c < d; c++) l.last().remove(), l = o.find(".row").first().children();
                                    t._loaded_count = t._limit
                                }
                                n.slick("slickAdd", o[0].outerHTML), n.slick("slickNext"), roar.initCountdown(), roar.initLazyLoading("#" + s, !0), roar.initProductQuickShopItem("#" + s), roar.handleQuickshop("#" + s), window.show_multiple_currencies && theme.CurrencyPicker.convert("#sandbox .money")
                            }
                            r.removeClass("b-loading")
                        },
                        error: function() {
                            console.log("Something went wrong")
                        }
                    }), !1) : (n.slick("slickNext"), !1)
                }), $("#myCarousel" + t._id + "_prev").click(function() {
                    return n.slick("slickPrev"), !1
                })
            }
        },
        onUnload: function() {
            this.$container.off(this.productTabNamspace)
        }
    }), e
}(), theme.AdvancedGridSection = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.advancedGridId = $("#shopify-section-" + a), this.advancedGrid = $("#advanced-grid-" + a), this.advancedGridNamspace = "#advanced-grid-" + a, this._ag_bgtype = this.advancedGrid.data("_ag_bgtype"), this._ag_fullwidth = this.advancedGrid.data("_ag_fullwidth"), this._agProductsCarousel = $(".myProductsCarousel-" + a), this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            if (this._ag_fullwidth && !window.sidebar) {
                var e = this.sectionId;
                onFullWidthOption(e)
            }
            "2" == this._ag_bgtype && this._initParalax(), this._initProductTab(), this._initProductsSlide(), this._initCountdown()
        },
        _initCountdown: function() {
            0 < $(".ag_product_countdown").length && $(".ag_product_countdown").each(function() {
                var e = parseInt($(this).data("offer_date_year")),
                    t = parseInt($(this).data("offer_date_month")),
                    a = parseInt($(this).data("offer_date_day")),
                    o = new Date,
                    r = new Date(e, t - 1, a);
                o < r ? $(this).countdown({
                    until: r
                }) : $(this).hide()
            })
        },
        _initParalax: function() {
            var e = this.sectionId;
            $(".advanced-grid-" + e + " .parallax-window").scrolly({
                bgParallax: !0
            })
        },
        _initProductsSlide: function() {
            0 < this._agProductsCarousel.length && this._agProductsCarousel.each(function() {
                var e = $(this),
                    t = e.data("_skin_type"),
                    a = e.data("_id");
                "sportwinter" == t ? e.owlCarousel({
                    slideSpeed: 500,
                    items: 1,
                    rtl: window.rtl
                }) : e.owlCarousel({
                    responsive: {
                        0: {
                            items: window.pitem_row
                        },
                        320: {
                            items: window.pitem_row
                        },
                        479: {
                            items: 2
                        },
                        767: {
                            items: 3
                        },
                        979: {
                            items: 4
                        },
                        1199: {
                            items: 5
                        }
                    },
                    rtl: window.rtl
                }), $("#myCarousel" + a + "_next").click(function() {
                    return e.trigger("next.owl.carousel"), !1
                }), $("#myCarousel" + a + "_prev").click(function() {
                    return e.trigger("prev.owl.carousel"), !1
                })
            })
        },
        _initProductTab: function() {
            var e = this.sectionId,
                t = this;
            $(".ag-products-tabs-" + e).each(function() {
                var e = $(this).data("_tabcount"),
                    a = $(this).data("_block_id");
                t._initTab(a), t._initMultiSlide(a)
            })
        },
        _initTab: function(e) {
            0 < $(".tab-filter-tabs-" + e).length && $(".tab-filter-tabs-" + e + " a").each(function() {
                $(this).click(function(t) {
                    t.preventDefault(), $(this).tab("show")
                })
            })
        },
        _initMultiSlide: function(e) {
            0 < $(".ag-product-tab-item-" + e).length && $(".ag-product-tab-item-" + e).each(function() {
                var e = $(this).data("_pid"),
                    t = $(this).data("_acm_carousel"),
                    a = $(this).data("_catid"),
                    o = $(this).data("_nextpage"),
                    r = $(this).data("_itemsperpage"),
                    n = parseInt($(this).data("_limit"), 10),
                    s = $(this).data("_colclass"),
                    l = !1,
                    d = parseInt($(this).data("_itemsperpage"), 10),
                    c = 1,
                    p = 0;
                if (t) {
                    var u = $(".filter-product #myCarousel" + e),
                        m = $(".filter-product #myCarousel" + e + " .carousel-inner");
                    m.slick({
                        autoplaySpeed: 500,
                        rtl: window.rtl,
                        slidesToShow: 1,
                        arrows: !1,
                        infinite: !1
                    }), m.on("reInit ", function(e, t) {
                        c = t.slideCount
                    }), m.on("afterChange", function(e, t) {
                        p = t.currentSlide
                    }), $("#myCarousel" + e + "_next").click(function() {
                        return c == p + 1 && "" != a && !1 == l && d < n ? (u.addClass("b-loading"), $.ajax({
                            url: "/collections/" + a,
                            type: "get",
                            dataType: "html",
                            data: {
                                view: "customlim",
                                limit: r + "a" + s,
                                page: o
                            },
                            success: function(t) {
                                var a = t.trim();
                                if ("" == a) l = !0;
                                else {
                                    var r = $(a),
                                        s = "row-" + e + "-" + o,
                                        c = r.find(".row").first().attr("id", s).children();
                                    if (d + c.length <= n) ++o, d += c.length;
                                    else {
                                        for (var p = d + c.length - n, h = 0; h < p; h++) c.last().remove(), c = r.find(".row").first().children();
                                        d = n
                                    }
                                    m.slick("slickAdd", r[0].outerHTML), m.slick("slickNext"), roar.initCountdown(), roar.initLazyLoading("#" + s, !0), roar.initProductQuickShopItem("#" + s), roar.handleQuickshop("#" + s), window.show_multiple_currencies && theme.CurrencyPicker.convert("#sandbox .money")
                                }
                                u.removeClass("b-loading")
                            },
                            error: function() {
                                console.log("Something went wrong")
                            }
                        }), !1) : (m.slick("slickNext"), !1)
                    }), $("#myCarousel" + e + "_prev").click(function() {
                        return m.slick("slickPrev"), !1
                    })
                }
            })
        },
        onUnload: function() {
            this.$container.off(this.advancedGridNamspace)
        }
    }), e
}(), theme.PrefaceFooterSection = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.prefaceFooterId = $("#shopify-section-" + a), this.prefaceFooter = $("#preface-footer-" + a), this.prefaceFooterNamspace = "#preface-footer-" + a, this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {},
        onUnload: function() {
            this.$container.off(this.prefaceFooterNamspace)
        }
    }), e
}(), theme.FooterTopSection = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.footerTopId = $("#shopify-section-" + a), this.footerTop = $("#footer-top-" + a), this.footerTopNamspace = "#footer-top-" + a, this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {},
        onUnload: function() {
            this.$container.off(this.footerTopNamspace)
        }
    }), e
}(), theme.FooterBottomSection = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.footerTopId = $("#shopify-section-" + a), this.footerTop = $("#footer-top-" + a), this.footerTopNamspace = "#footer-top-" + a, this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {},
        onUnload: function() {
            this.$container.off(this.footerTopNamspace)
        }
    }), e
}(), theme.FooterCopyRightSection = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.footerCopyRightId = $("#shopify-section-" + a), this.footerCopyRight = $("#footer-copyright-" + a), this.footerCopyRightNamspace = "#footer-copyright-" + a, this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {},
        onUnload: function() {
            this.$container.off(this.footerCopyRightNamspace)
        }
    }), e
}(), theme.FooterColumn = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.footerColumnId = $("#shopify-section-" + a), this.footerColumn = $("#footer-column-" + a), this.footerColumnNamspace = "#footer-column-" + a, this._class = this.footerColumn.data("_class"), this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            "" != this._class && this.footerColumnId.addClass(this._class)
        },
        onUnload: function() {
            this.$container.off(this.footerColumnNamspace)
        }
    }), e
}(), theme.TestimonialSection = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.testimonialId = $("#shopify-section-" + a), this.testimonial = $("#testimonial-" + a), this.testimonialNamspace = "#testimonial-" + a, this.placement_fullwidth = this.testimonial.data("placement_fullwidth"), this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            var e = this.sectionId,
                t = $(".box #myCarousel_testi_" + e + " .testimonial-slide"),
                a = !1;
            if (1 == parseInt(window.rtl) && (a = !0), t.not(".slick-initialized").slick({
                    arrows: !1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rtl: a
                }), $("#myCarousel_testi_next_" + e).click(function() {
                    return t.slick("slickNext"), !1
                }), $("#myCarousel_testi_prev_" + e).click(function() {
                    return t.slick("slickPrev"), !1
                }), $(window).resize(function() {
                    t.slick("setPosition")
                }), "1" == this.placement_fullwidth && !window.sidebar) {
                var e = this.sectionId;
                onFullWidthOption(e)
            }
        },
        onUnload: function() {
            this.$container.off(this.testimonialNamspace)
        }
    }), e
}(), theme.LatestBlogSection = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.latestBlogId = $("#shopify-section-" + a), this.latestBlog = $("#latest_blog-" + a), this.latestBlogSlider = $("#latest_blog-" + a + " .blog-slick-slider"), this.latestBlogNamspace = "#latest_blog-" + a, this.placement_fullwidth = this.latestBlog.data("placement_fullwidth"), this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            if ("1" == this.placement_fullwidth && !window.sidebar) {
                var e = this.sectionId;
                onFullWidthOption(e)
            }
            this._initSlide()
        },
        _initSlide: function() {
            var e = !1;
            1 == parseInt(window.rtl) && (e = !0), 0 < this.latestBlogSlider.length && this.latestBlogSlider.not(".slick-initialized").slick({
                rtl: e,
                slidesToShow: 3,
                slidesToScroll: 1,
                prevArrow: "<a class=\"prev-button arrow-btn\" href=\"#\"><svg><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#global__symbols-prev\"></use></svg></a>",
                nextArrow: "<a class=\"next-button arrow-btn\" href=\"#\"><svg><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#global__symbols-next\"></use></svg></a>",
                responsive: [{
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            })
        },
        onUnload: function() {
            this.$container.off(this.latestBlogNamspace)
        }
    }), e
}(), theme.InstafeedSection = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.instafeedId = $("#shopify-section-" + a), this.instafeed = $("#home-instagram-widget-" + a), this.instafeedNamspace = "#home-instagram-widget-" + a, this.instagram_list = $("#instagram_home_" + a), this.instagram_target = "instagram_home_" + a, this.placement_fullwidth = this.instafeed.data("placement_fullwidth"), this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            if ("1" == this.placement_fullwidth && !window.sidebar) {
                var e = this.sectionId;
                onFullWidthOption(e)
            }
            0 < this.instagram_list.length && this._instafeedRun()
        },
        _instafeedRun: function() {
            var e = this.instagram_target,
                t = this.instagram_list.data("social_instagram_token"),
                a = this.instagram_list.data("user_id"),
                o = this.instagram_list.data("home_instafeed_limit"),
                r = new Instafeed({
                    get: "user",
                    target: e,
                    accessToken: t,
                    userId: a,
                    limit: o,
                    resolution: "thumbnail",
                    resolution2: "standard_resolution",
                    template: "<div class=\"wrap animated\"><a target=\"_blank\" href=\"{{link}}\"><img src=\"{{image}}\" alt=\"{{caption}}\" width=\"150\" height=\"150\" /><span class=\"hover_border\"></span></a></div>"
                });
            r.run()
        },
        onUnload: function() {
            this.$container.off(this.instafeedNamspace)
        }
    }), e
}(), theme.mobileNavSection = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.mobileNavId = $("#shopify-section-" + a), this.mobileNav = $("#primary-" + a), this.mobilenavNamespace = "#primary-" + a, this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            this._initMobile()
        },
        _initMobile: function() {
            $("#off-canvas-layer").on("click", function() {
                $(document.body).removeClass("open-canvas-panel"), $(document.body).removeClass("open_filter")
            }), $(".mobile-nav-icon").on("click", function() {
                $(document.body).toggleClass("open-canvas-panel")
            }), $(".mobile-child-menu").on("click", function() {
                var e = $(this).closest(".menu-item-has-children");
                e.toggleClass("mobile-active")
            }), $(".mobile-nav-search, .mobile-nav-search-close").on("click", function() {
                $(document.body).toggleClass("open-search-form"), $(".mobile-nav-search-form input").focus()
            }), $(window).on("resize", function() {
                991 < $(window).width() && $(document.body).removeClass("open-canvas-panel")
            })
        },
        onUnload: function() {
            this.$container.off(this.mobilenavNamespace)
        }
    }), e
}(), theme.ProductVariantMobile = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.wrapperId = $("#" + a), this.wrapper = $("#" + a), this.wrapperNamspace = "#" + a, this.addCartId = $("#btn-" + a + ".m-allow-cart"), this.addCartClass = $(".variant-item-" + a + ".m-allow-cart"), this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            var e = this;
            e._initScroll(), e._initCompact(), e._initEvents(), $(window).resize(function() {
                991 >= $(window).width() && e._initCompact()
            })
        },
        _initScroll: function() {
            $(window).on("scroll", function() {
                var e = $("#shopify-section-product-variants-mobile").height();
                $(window).scrollTop() > e ? $(document.body).addClass("sticky-product-variants-mobile") : ($(document.body).removeClass("sticky-product-variants-mobile"), $(".product-variants-mobile").hasClass("active") && $(".product-variants-mobile").height($(".variants-header").data("height")))
            })
        },
        _initCompact: function() {
            if (0 < $(".product-variant-mobile-section").length) {
                var e = $(".product-variant-mobile-section"),
                    t = $(".product-variants-mobile");
                t.each(function() {
                    var e = $(this),
                        t = e.find(".variants-header"),
                        a = t.innerHeight(),
                        o = e.find(".variants-content").outerHeight(),
                        r = t.closest(".product-variants-mobile");
                    t.data("height", a), e.data("height", a + o)
                }), t.each(function() {
                    var e = $(this),
                        t = e.find(".variants-header"),
                        a = t.innerHeight(),
                        o = e.find(".variants-content").outerHeight(),
                        r = t.closest(".product-variants-mobile");
                    t.data("height", a), e.data("height", a + o), r.hasClass("active") && r.height(r.data("height"))
                }), e.unbind("click") && e.on("click", ".variants-header .title", function() {
                    var e = $(this),
                        a = e.closest(".variants-header"),
                        o = e.closest(".product-variants-mobile");
                    o.hasClass("active") || t.closest(".active").removeClass("active").height(e.data("height")), o.toggleClass("active"), o.hasClass("active") ? o.height(o.data("height")) : o.height(a.data("height"))
                })
            }
        },
        _initEvents: function() {
            var e = $("#ProductSelect-product-template.variation-select").val();
            0 < this.addCartId.length && (this.addCartId.unbind("click"), this.addCartId.on("click", function() {
                $("#ProductSelect-product-template.variation-select").val(e), $("#AddToCart-product-template").trigger("click")
            })), 0 < this.addCartClass.length && (this.addCartClass.unbind("click"), this.addCartClass.on("click", function() {
                var e = $(this).data("id");
                $("#ProductSelect-product-template.variation-select").val(e), $("#AddToCart-product-template").trigger("click")
            }))
        },
        onUnload: function() {
            this.$container.off(this.wrapperNamspace)
        }
    }), e
}(), theme.CartVariantMobile = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.wrapperId = $("#" + a), this.wrapper = $("#" + a), this.wrapperNamspace = "#" + a, this.addCartId = $("#btn-" + a + ".m-allow-cart"), this.addCartClass = $(".variant-item-" + a + ".m-allow-cart"), this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            var e = this;
            e._initScroll()
        },
        _initScroll: function() {
            $(window).on("scroll", function() {
                var e = $("#shopify-section-product-variants-mobile").height();
                $(window).scrollTop() > e ? $(document.body).addClass("sticky-product-variants-mobile") : ($(document.body).removeClass("sticky-product-variants-mobile"), $(".product-variants-mobile").hasClass("active") && $(".product-variants-mobile").height($(".variants-header").data("height")))
            })
        },
        onUnload: function() {
            this.$container.off(this.wrapperNamspace)
        }
    }), e
}(), theme.Brands = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.brandsId = $("#brands-" + a), this.featuredBrands = $(".featured-brands-" + a), this.brandsNamspace = "#brands-" + a, this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            var e = this.featuredBrands.data("perview"),
                t = this.featuredBrands.data("autoplay"),
                a = this.featuredBrands.data("speed"),
                o = !1;
            "1" == t && (o = !0), this.featuredBrands.not(".slick-initialized").slick({
                rtl: window.rtl,
                slidesToShow: e,
                slidesToScroll: 1,
                autoplaySpeed: a,
                autoplay: t,
                infinite: !0,
                prevArrow: "<a class=\"prev-button arrow-btn\" href=\"#\"><svg><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#global__symbols-prev\"></use></svg></a>",
                nextArrow: "<a class=\"next-button arrow-btn\" href=\"#\"><svg><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#global__symbols-next\"></use></svg></a>",
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }]
            })
        },
        onUnload: function() {
            this.$container.off(this.brandsNamspace)
        }
    }), e
}(), 
/* theme.rvsVideo = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.rvsId = $("#shopify-section-" + a), this.rvsNamspace = "#rvsvideo-" + a + "_wrapper", this.rvsMain = "#rvsvideo-" + a, this.placement_fullwidth = $(this.rvsNamspace).data("placement_fullwidth"), this.delayTime = $(this.rvsNamspace).data("delaytime"), this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            var e, t = this.sectionId,
                a = this.rvsMain,
                o = this.delayTime,
                r = this.placement_fullwidth,
                n = jQuery;
            n(document).ready(function() {
                null == n(a).revolution ? revslider_showDoubleJqueryError(a) : (e = n(a).show().revolution({
                    sliderType: "carousel",
                    jsFileLocation: "https://storage.googleapis.com/revolutionslider/revolution/js/",
                    sliderLayout: "fullwidth",
                    dottedOverlay: "none",
                    delay: o,
                    navigation: {
                        keyboardNavigation: "off",
                        keyboard_direction: "horizontal",
                        mouseScrollNavigation: "off",
                        mouseScrollReverse: "default",
                        onHoverStop: "off",
                        touch: {
                            touchenabled: "on",
                            touchOnDesktop: "off",
                            swipe_threshold: 75,
                            swipe_min_touches: 1,
                            swipe_direction: "horizontal",
                            drag_block_vertical: !1
                        },
                        arrows: {
                            style: "gyges",
                            enable: !0,
                            hide_onmobile: !1,
                            hide_onleave: !1,
                            tmp: "",
                            left: {
                                h_align: "left",
                                v_align: "center",
                                h_offset: 20,
                                v_offset: 0
                            },
                            right: {
                                h_align: "right",
                                v_align: "center",
                                h_offset: 20,
                                v_offset: 0
                            }
                        },
                        tabs: {
                            style: "gyges",
                            enable: !0,
                            width: 250,
                            height: 80,
                            min_width: 250,
                            wrapper_padding: 30,
                            wrapper_color: "rgba(38,41,43,1)",
                            tmp: "<div class=\"tp-tab-content\">  <span class=\"tp-tab-date\">{{param1}}</span>  <span class=\"tp-tab-title\">{{title}}</span></div><div class=\"tp-tab-image\"></div>",
                            visibleAmount: 5,
                            hide_onmobile: !1,
                            hide_onleave: !1,
                            hide_delay: 200,
                            direction: "horizontal",
                            span: !0,
                            position: "outer-bottom",
                            space: 0,
                            h_align: "center",
                            v_align: "bottom",
                            h_offset: 0,
                            v_offset: 0
                        }
                    },
                    carousel: {
                        horizontal_align: "center",
                        vertical_align: "center",
                        fadeout: "on",
                        vary_fade: "on",
                        maxVisibleItems: 3,
                        infinity: "on",
                        space: 0,
                        stretch: "off",
                        showLayersAllTime: "off",
                        easing: "Power3.easeInOut",
                        speed: "800"
                    },
                    visibilityLevels: [1240, 1024, 778, 480],
                    gridwidth: 720,
                    gridheight: 405,
                    lazyType: "none",
                    shadow: 0,
                    spinner: "off",
                    stopLoop: "on",
                    stopAfterLoops: 0,
                    stopAtSlide: 1,
                    shuffle: "off",
                    autoHeight: "off",
                    disableProgressBar: "on",
                    hideThumbsOnMobile: "off",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: !1,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: !1
                    }
                }), e.one("revolution.slide.onloaded", function() {
                    "1" != r || window.sidebar || onFullWidthOption(t), e.revredraw()
                }))
            })
        },
        onUnload: function() {}
    }), e
}(), theme.rvsHighlight = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.rvshighlightId = $("#shopify-section-" + a), this.rvshighlightNamspace = "#rvshighlight-" + a + "_wrapper", this.rvshighlightMain = "#rvshighlight-" + a, this.placement_fullwidth = $(this.rvshighlightNamspace).data("placement_fullwidth"), this.delayTime = $(this.rvshighlightNamspace).data("delaytime"), this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            var e, t = this.sectionId,
                a = this.rvshighlightMain,
                o = this.delayTime,
                r = this.placement_fullwidth,
                n = jQuery;
            n(document).ready(function() {
                null == n(a).revolution ? revslider_showDoubleJqueryError(a) : (e = n(a).show().revolution({
                    sliderType: "standard",
                    jsFileLocation: "https://storage.googleapis.com/revolutionslider/revolution/js/",
                    sliderLayout: "auto",
                    dottedOverlay: "none",
                    delay: o,
                    navigation: {
                        keyboardNavigation: "off",
                        keyboard_direction: "horizontal",
                        mouseScrollNavigation: "off",
                        mouseScrollReverse: "default",
                        onHoverStop: "off",
                        touch: {
                            touchenabled: "on",
                            swipe_threshold: 75,
                            swipe_min_touches: 1,
                            swipe_direction: "horizontal",
                            drag_block_vertical: !1
                        },
                        tabs: {
                            style: "zeus",
                            enable: !0,
                            width: 100,
                            height: 30,
                            min_width: 100,
                            wrapper_padding: 0,
                            wrapper_color: "transparent",
                            wrapper_opacity: "0",
                            tmp: "<span class=\"tp-tab-title\">{{title}}</span>",
                            visibleAmount: 3,
                            hide_onmobile: !0,
                            hide_under: 480,
                            hide_onleave: !1,
                            hide_delay: 200,
                            direction: "horizontal",
                            span: !0,
                            position: "inner",
                            space: 1,
                            h_align: "left",
                            v_align: "top",
                            h_offset: 30,
                            v_offset: 30
                        }
                    },
                    viewPort: {
                        enable: !0,
                        outof: "pause",
                        visible_area: "90%",
                        presize: !1
                    },
                    responsiveLevels: [1240, 1024, 778, 480],
                    visibilityLevels: [1240, 1024, 778, 480],
                    gridwidth: [1230, 1024, 767, 480],
                    gridheight: [720, 720, 480, 360],
                    lazyType: "none",
                    parallax: {
                        type: "scroll",
                        origo: "enterpoint",
                        speed: 400,
                        levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 46, 47, 48, 49, 50, 55],
                        type: "scroll"
                    },
                    shadow: 0,
                    spinner: "off",
                    stopLoop: "off",
                    stopAfterLoops: -1,
                    stopAtSlide: -1,
                    shuffle: "off",
                    autoHeight: "off",
                    hideThumbsOnMobile: "off",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: !1,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: !1
                    }
                }), e.one("revolution.slide.onloaded", function() {
                    "1" != r || window.sidebar || onFullWidthOption(t), e.revredraw()
                }))
            })
        },
        onUnload: function() {}
    }), e
}(), theme.rvsProducts = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.rvsproductsId = $("#shopify-section-" + a), this.rvsproductsNamspace = "#rvsproducts-" + a + "_wrapper", this.rvsproductsMain = "#rvsproducts-" + a, this.placement_fullwidth = $(this.rvsproductsNamspace).data("placement_fullwidth"), this.delayTime = $(this.rvsproductsNamspace).data("delaytime"), this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            var e, t = this.sectionId,
                a = this.rvsproductsMain,
                o = this.delayTime,
                r = this.placement_fullwidth,
                n = jQuery;
            n(document).ready(function() {
                null == n(a).revolution ? revslider_showDoubleJqueryError(a) : (e = n(a).show().revolution({
                    sliderType: "standard",
                    jsFileLocation: "https://storage.googleapis.com/revolutionslider/revolution/js/",
                    sliderLayout: "auto",
                    dottedOverlay: "none",
                    delay: o,
                    navigation: {
                        keyboardNavigation: "off",
                        keyboard_direction: "horizontal",
                        mouseScrollNavigation: "off",
                        mouseScrollReverse: "default",
                        onHoverStop: "on",
                        touch: {
                            touchenabled: "on",
                            swipe_threshold: 75,
                            swipe_min_touches: 50,
                            swipe_direction: "horizontal",
                            drag_block_vertical: !1
                        },
                        arrows: {
                            style: "gyges",
                            enable: !0,
                            hide_onmobile: !1,
                            hide_onleave: !1,
                            tmp: "",
                            left: {
                                h_align: "right",
                                v_align: "bottom",
                                h_offset: 40,
                                v_offset: 0
                            },
                            right: {
                                h_align: "right",
                                v_align: "bottom",
                                h_offset: 0,
                                v_offset: 0
                            }
                        }
                    },
                    responsiveLevels: [1240, 1024, 778, 480],
                    visibilityLevels: [1240, 1024, 778, 480],
                    gridwidth: [1200, 1024, 778, 480],
                    gridheight: [600, 600, 600, 600],
                    lazyType: "single",
                    parallax: {
                        type: "scroll",
                        origo: "slidercenter",
                        speed: 400,
                        levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55],
                        type: "scroll"
                    },
                    shadow: 0,
                    spinner: "off",
                    stopLoop: "off",
                    stopAfterLoops: -1,
                    stopAtSlide: -1,
                    shuffle: "off",
                    autoHeight: "off",
                    disableProgressBar: "on",
                    hideThumbsOnMobile: "off",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: !1,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: !1
                    }
                }), e.one("revolution.slide.onloaded", function() {
                    "1" != r || window.sidebar || onFullWidthOption(t), e.revredraw()
                }))
            })
        },
        onUnload: function() {}
    }), e
}(), theme.YourCollections = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.latestCategoryId = $("#shopify-section-" + a), this.latestCategoryNamspace = $(".your-collections-" + a), this._limit = this.latestCategoryNamspace.data("limit"), this._speed = this.latestCategoryNamspace.data("speed"), this._autoplay = this.latestCategoryNamspace.data("autoplay"), this.placement_fullwidth = this.latestCategoryNamspace.data("placement_fullwidth"), this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            var e = this.sectionId,
                t = ".your-collections-wrapper .CollectionGrid-" + e;
            "1" != this.placement_fullwidth || window.sidebar || onFullWidthOption(e), $(t).slick({
                slidesToShow: this._limit,
                slidesToScroll: 1,
                autoplay: this._autoplay,
                autoplaySpeed: this._speed,
                prevArrow: "<a class=\"prev-button arrow-btn\" href=\"#\"><svg><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#global__symbols-prev\"></use></svg></a>",
                nextArrow: "<a class=\"next-button arrow-btn\" href=\"#\"><svg><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#global__symbols-next\"></use></svg></a>",
                rtl: window.rtl,
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 469,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }]
            }), roar.initLazyLoading(t, !0)
        },
        onUnload: function() {
            this.$container.off(this.latestCategoryNamspace)
        }
    }), e
}(),  */
theme.CollectionsList = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.latestCollectionId = $("#shopify-section-" + a), this.latestCollectionNamspace = $(".collections-list-" + a), this._limit = this.latestCollectionNamspace.data("limit"), this._total = this.latestCollectionNamspace.data("count"), this._speed = this.latestCollectionNamspace.data("speed"), this._autoplay = this.latestCollectionNamspace.data("autoplay"), this.placement_fullwidth = this.latestCollectionNamspace.data("placement_fullwidth"), this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            var e = this.sectionId,
                t = ".content-colection-list-" + this.sectionId;
            roar.initLazyLoading(t, !0), $(t).slick({
                slidesToShow: this._limit,
                slidesToScroll: 1,
                autoplay: this._autoplay,
                autoplaySpeed: this._speed,
                prevArrow: "<a class=\"prev-button arrow-btn\" href=\"#\"><svg><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#global__symbols-prev\"></use></svg></a>",
                nextArrow: "<a class=\"next-button arrow-btn\" href=\"#\"><svg><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#global__symbols-next\"></use></svg></a>",
                rtl: window.rtl,
                responsive: [{
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 469,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            })
        },
        onUnload: function() {
            this.$container.off(this.latestCollectionNamspace)
        }
    }), e
}(), theme.ShippingCalculator = function() {
    function ShippingCalculator(e) {
        var t = this.$container = $(e),
            a = t.attr("data-section-id");
        this.selectors = {
            shipping_btn: "#cart__shipping-btn-" + a,
            shipping_calculator: "#shipping__calculator-" + a,
            get_rates: "#shipping__calculator-btn-" + a,
            response: "#shipping__calculator-response-" + a,
            template: "<p id =\"shipping-rates-feedback-" + a + "\" class=\"shipping-rates-feedback\"></p>",
            address_country: "address_country-" + a,
            address_province: "address_province-" + a,
            address_zip: "address_zip-" + a,
            address_province_label: "address_province_label-" + a,
            address_province_container: "address_province_container-" + a
        }, this.strings = {
            submitButton: "Calculate shipping",
            submitButtonDisabled: "Calculating...",
            customerIsLoggedIn: !1,
            moneyFormat: theme.settings.moneyFormat
        }, this._init()
    }
    return ShippingCalculator.prototype = _.assignIn({}, ShippingCalculator.prototype, {
        _disableButtons: function() {
            var e = this.selectors,
                t = this.strings;
            $(e.get_rates).text(t.submitButtonDisabled).attr("disabled", "disabled").addClass("disabled")
        },
        _enableButtons: function() {
            var e = this.selectors,
                t = this.strings;
            $(e.get_rates).removeAttr("disabled").removeClass("disabled").text(t.submitButton)
        },
        _render: function(e) {
            var t = this.selectors,
                a = this.strings,
                o = $(t.template),
                r = $(t.response);
            if (r.length) {
                if (!e.success) o.addClass("error"), o.append(e.errorFeedback);
                else if (o.addClass("success"), e.rates) {
                    o.append(e.rates);
                    var n = e.rates;
                    if (n[0]) {
                        var s = n[0];
                        o.append("Rates start at <span class=\"money\">" + s.price + "</span>.")
                    }
                } else o.append("We do not ship to this destination.");
                o.appendTo(r), theme.CurrencyPicker.convert(t.response + " .money")
            }
        },
        _formatRate: function(e) {
            function t(e, t) {
                return "undefined" == typeof e ? t : e
            }

            function a(e, a, o, r) {
                if (a = t(a, 2), o = t(o, ","), r = t(r, "."), isNaN(e) || null == e) return 0;
                e = (e / 100).toFixed(a);
                var n = e.split("."),
                    s = n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + o),
                    l = n[1] ? r + n[1] : "";
                return s + l
            }
            var o = this.selectors,
                r = this.strings;
            if ("function" == typeof theme.Currency.formatMoney) return theme.Currency.formatMoney(e, r.moneyFormat);
            "string" == typeof e && (e = e.replace(".", ""));
            var n = "",
                s = /\{\{\s*(\w+)\s*\}\}/,
                l = r.moneyFormat;
            switch (l.match(s)[1]) {
                case "amount":
                    n = a(e, 2);
                    break;
                case "amount_no_decimals":
                    n = a(e, 0);
                    break;
                case "amount_with_comma_separator":
                    n = a(e, 2, ".", ",");
                    break;
                case "amount_no_decimals_with_comma_separator":
                    n = a(e, 0, ".", ",");
            }
            return l.replace(s, n)
        },
        _onCartShippingRatesUpdate: function(e, t) {
            var a = this,
                o = this.selectors,
                r = this.strings;
            a._enableButtons();
            var n = "";
            if (t.zip && (n += t.zip + ", "), t.province && (n += t.province + ", "), n += t.country, e.length)
                for (var s = 0; s < e.length; s++) e[s].price = a._formatRate(e[s].price);
            a._render({
                rates: e,
                address: n,
                success: !0
            }), $(o.response).fadeIn()
        },
        _pollForCartShippingRatesForDestination: function(e) {
            var t = this,
                a = this.selectors,
                o = this.strings,
                r = function() {
                    $.ajax("/cart/async_shipping_rates", {
                        dataType: "json",
                        success: function(a, o, n) {
                            200 === n.status ? t._onCartShippingRatesUpdate(a.shipping_rates, e) : setTimeout(r, 500)
                        },
                        error: function(e, a) {
                            t._onError(e, a, t)
                        }
                    })
                };
            return r
        },
        _fullMessagesFromErrors: function(e) {
            var t = this.selectors,
                a = this.strings,
                o = [];
            return $.each(e, function(e, t) {
                $.each(t, function(t, a) {
                    o.push(e + " " + a)
                })
            }), o
        },
        _onError: function(XMLHttpRequest, textStatus, self) {
            var selectors = self.selectors,
                strings = self.strings;
            self._enableButtons();
            var feedback = "",
                data = eval("(" + XMLHttpRequest.responseText + ")");
            feedback = data.message ? data.message + "(" + data.status + "): " + data.description : "Error : " + self._fullMessagesFromErrors(data).join("; ") + ".", "Error : country is not supported." == feedback && (feedback = "We do not ship to this destination."), self._render({
                rates: [],
                errorFeedback: feedback,
                success: !1
            }), $(selectors.response).show()
        },
        _getCartShippingRatesForDestination: function(e) {
            var t = this,
                a = this.selectors,
                o = this.strings;
            $.ajax({
                type: "POST",
                url: "/cart/prepare_shipping_rates",
                data: $.param({
                    shipping_address: e
                }),
                success: t._pollForCartShippingRatesForDestination(e),
                error: function(e, a) {
                    t._onError(e, a, t)
                }
            })
        },
        _init: function() {
            var e = this,
                t = this.selectors,
                a = this.strings;
            if ($(t.shipping_calculator).length) {
                new Shopify.CountryProvinceSelector(t.address_country, t.address_province, {
                    hideElement: t.address_province_container
                });
                var o = $("#" + t.address_country),
                    r = $("#" + t.address_province_label).get(0);
                "undefined" != typeof Countries && (Countries.updateProvinceLabel(o.val(), r), o.change(function() {
                    Countries.updateProvinceLabel(o.val(), r)
                })), $(t.get_rates).click(function() {
                    e._disableButtons(), $(t.response).empty().hide();
                    var a = {};
                    a.zip = $("#" + t.address_zip).val() || "", a.country = $("#" + t.address_country).val() || "", a.province = $("#" + t.address_province).val() || "", e._getCartShippingRatesForDestination(a)
                }), a.customerIsLoggedIn && $(t.get_rates + ":eq(0)").trigger("click"), $(t.shipping_btn).click(function() {
                    $(t.shipping_calculator).slideToggle()
                })
            }
        },
        onUnload: function() {}
    }), ShippingCalculator
}(), theme.GalleryTemplate = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = t.attr("data-section-id");
        this.selectors = {
            grid_gallery: "grid-gallery-" + a
        }, this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            new CBPGridGallery(document.getElementById(this.selectors.grid_gallery))
        },
        onUnload: function() {}
    }), e
}(), theme.FilterWidgetSection = function() {
    function e(e) {
        var t = this.$container = $(e),
            a = this.sectionId = t.attr("data-section-id"),
            o = t.attr("data-section-type");
        this.filterWidgetId = $("#shopify-section-" + a), this.filterWidgetNamspace = "#filter-widget-" + a, this.filterNewSelect = $("#filter-widget-" + a + " .new-select"), this.filterCollectionId = $("#filter-widget-" + a + " #select_collection select"), this.filterTagSelection = $("#filter-widget-" + a + " .tag-selection"), this.filterButton = $("#filter-widget-" + a + " .button"), this.placement_fullwidth = $(this.filterWidgetNamspace).data("placement_fullwidth"), this._init(), this._initDropdown()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            if ("1" == this.placement_fullwidth && !window.sidebar) {
                var e = this.sectionId;
                onFullWidthOption(e)
            }
        },
        _initDropdown: function() {
            this.filterNewSelect.each(function() {
                var e = $(this).find("select"),
                    t = $(this).find("a.custom-selection"),
                    a = $(this).find("ul.custom-options"),
                    o = a.find("a");
                t.click(function(e) {
                    e.stopPropagation(), $("a.custom-selection").not(this).next("ul.options").hide().removeClass("active");
                    var t = $(this).next(a);
                    t.stop().slideToggle("fast", function() {
                        $(this).toggleClass("active")
                    })
                }), o.click(function(o) {
                    console.log("xx"), o.stopPropagation(), t.text($(this).text()).removeClass("active"), e.find("option").prop("selected", !1), e.find("option[value=\"" + $(this).attr("rel") + "\"]").prop("selected", "selected"), a.hide(), e.change()
                }), $(document).click(function() {
                    t.removeClass("active"), a.hide()
                })
            });
            var e = this.filterTagSelection;
            this.filterCollectionId.on("change", function() {
                var t = $(this).find("option:selected").val();
                $(this).parent().find(".first").removeClass("hidden"), "" === t ? (e.find(".custom-select").addClass("disabled"), e.find(".tag-filter").val("").attr("disabled", !0)) : ($(this).parent().find(".error").hide(), e.find(".custom-select").removeClass("disabled").addClass("enabled"), e.find(".tag-filter").val("").attr("disabled", !1))
            });
            var t = this.filterTagSelection.find("select");
            t.on("change", function() {
                $(this).find("option:selected").val();
                $(this).parent().find(".first").removeClass("hidden")
            });
            var a = this.filterCollectionId,
                o = this.filterCollectionId.parent().find(".error");
            this.filterButton.click(function() {
                var e = [];
                if (t.each(function() {
                        var t = $(this).val();
                        "" !== t && e.push(t)
                    }), "" == a.val()) o.show();
                else {
                    var r = window.location.origin + a.val() + "?constraint=" + e.join("+");
                    window.location = r, o.hide()
                }
            })
        },
        onUnload: function() {
            this.$container.off(this.filterWidgetNamspace)
        }
    }), e
}();

function onFullWidthOption(e) {
    _force_full_width(e), $(window).resize(function() {
        _force_full_width(e)
    })
}

function _force_full_width(e) {
    var t = $(".standard-body .full-width #shopify-section-" + e);
    if (!window.rtl) {
        if (0 < t.size()) {
            t.width($("body").width()), t.css("left", "0px");
            var a = t.offset();
            t.css("left", "-" + a.left + "px"), t.find(".container").css("padding-left", a.left), t.find(".container").css("padding-right", a.left)
        }
    } else if (0 < t.size()) {
        t.width($("body").width()), t.css("right", "0px");
        var a = t.offset();
        t.css("right", "-" + -1 * a.left + "px"), t.find(".container").css("padding-left", -1 * a.left), t.find(".container").css("padding-right", -1 * a.left)
    }
    var o = $(".standard-body .fixed #shopify-section-" + e);
    if (!window.rtl) {
        if (0 < o.size()) {
            o.width($(".standard-body").width()), o.css("left", "0px");
            var a = o.offset(),
                r = $(".standard-body").offset(),
                n = a.left - r.left;
            o.css("left", "-" + n + "px"), o.find(".container").css("padding-left", n), o.find(".container").css("padding-right", n)
        }
    } else if (0 < o.size()) {
        o.width($(".standard-body").width()), o.css("right", "0px");
        var a = o.offset(),
            r = $(".standard-body").offset(),
            n = a.left - r.left;
        o.css("right", "-" + -1 * n + "px"), o.find(".container").css("padding-left", -1 * n), o.find(".container").css("padding-right", -1 * n)
    }
    var s = $(".standard-body .fixed2 #shopify-section-" + e);
    if (0 < s.size()) {
        s.width($("body").width()), s.css("left", "0px");
        var a = s.offset();
        s.css("left", "-" + a.left + "px"), s.find(".container").css("padding-left", a.left), s.find(".container").css("padding-right", a.left)
    }
    var l = $(".fixed-body #shopify-section-" + e);
    if (!window.rtl) {
        if (0 < l.size()) {
            l.width($(".fixed-body .main-fixed").width()), l.css("left", "0px");
            var a = l.offset(),
                r = $(".fixed-body .main-fixed").offset(),
                n = a.left - r.left;
            l.css("left", "-" + n + "px"), l.find(".container").css("padding-left", n), l.find(".container").css("padding-right", n)
        }
    } else if (0 < l.size()) {
        l.width($(".fixed-body .main-fixed").width()), l.css("right", "0px");
        var a = l.offset(),
            r = $(".fixed-body .main-fixed").offset(),
            n = a.left - r.left;
        l.css("right", "-" + -1 * n + "px"), l.find(".container").css("padding-left", -1 * n), l.find(".container").css("padding-right", -1 * n)
    }
}
$(document).ready(function() {
    var e = new theme.Sections;
    e.register("product-template", theme.Product), e.register("mega-menu", theme.MegaMenuSection), e.register("topblock-section", theme.TopBlockSection), e.register("custom-widget", theme.CustomWidgetSection), e.register("banner", theme.BannerSection), e.register("delivery-bar", theme.DeliveryBarSection), e.register("slideshow", theme.SlideShowSection), e.register("slideshow-with-html", theme.SlideShowSection), e.register("slideshow-with-megamenu", theme.SlideShowSection), e.register("sidebar", theme.SidebarSection), e.register("product-tab", theme.ProductTabSection), e.register("advanced-grid", theme.AdvancedGridSection), e.register("preface-footer", theme.PrefaceFooterSection), e.register("footer-top", theme.FooterTopSection), e.register("footer-bottom", theme.FooterBottomSection), e.register("footer-copyright", theme.FooterCopyRightSection), e.register("footer-column-1", theme.FooterColumn), e.register("footer-column-2", theme.FooterColumn), e.register("footer-column-3", theme.FooterColumn), e.register("footer-column-4", theme.FooterColumn), e.register("testimonial", theme.TestimonialSection), e.register("instafeed", theme.InstafeedSection), e.register("latest-blog", theme.LatestBlogSection), e.register("mobile-nav-section", theme.mobileNavSection), e.register("product-variant-mobile", theme.ProductVariantMobile), e.register("cart-variant-mobile", theme.CartVariantMobile), e.register("brands", theme.Brands), e.register("rvsvideo", theme.rvsVideo), e.register("rvshighlight", theme.rvsHighlight), e.register("rvsproducts", theme.rvsProducts), e.register("your-collections", theme.YourCollections), e.register("collections-list", theme.CollectionsList), e.register("shipping-calculator", theme.ShippingCalculator), e.register("collection-template", theme.Filters), e.register("search-template", theme.Filters), e.register("gallery-template", theme.GalleryTemplate), e.register("filter-widget", theme.FilterWidgetSection)
});
$(document).ready(function() {
    $("#header-notice .close-notice").on("click", function() {
        $("#header-notice .header-notice").children().hide()
    })
})