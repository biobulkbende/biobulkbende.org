import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
	constructor() {
		this.lazyImages = $(".lazyload");
		this.siteHeader = $(".site-header");
		this.siteLogo = $(".site-header__logo");
		this.siteNav = $(".primary-nav");
		this.siteLanguage = $(".site-header__language");
		this.siteButton = $(".site-header__btn-container");
		this.headerTriggerElement = $(".large-hero__title");
		this.createHeaderWaypoint();
		this.pageSections = $(".page-section");
		this.headerLinks = $(".primary-nav a");
		this.createPageSectionWaypoints();
		this.addSmoothScrolling();
		this.refreshWaypoints();
	}

	refreshWaypoints(){
		this.lazyImages.on('load', function() {
			Waypoint.refreshAll();
		});
	}

	addSmoothScrolling() {
		this.headerLinks.smoothScroll();
	}

	createHeaderWaypoint() {
		var that = this;
		new Waypoint({
			element: this.headerTriggerElement[0],
			handler: function(direction) {
				if (direction == "down") {
					that.siteHeader.addClass("site-header--dark");
					that.siteLogo.addClass("site-header__logo--small");
					that.siteNav.addClass("primary-nav--small");
					that.siteLanguage.addClass("site-header__language--small");
					that.siteButton.addClass("site-header__btn-container--small");
				} else {
					that.siteHeader.removeClass("site-header--dark");
					that.siteLogo.removeClass("site-header__logo--small");
					that.siteNav.removeClass("primary-nav--small");
					that.siteLanguage.removeClass("site-header__language--small");
					that.siteButton.removeClass("site-header__btn-container--small");
					that.headerLinks.removeClass("is-current-link");
				}
			},
			offset: "10%"
		});
	}

	createPageSectionWaypoints() {
		var that = this;
		this.pageSections.each(function(){
			var currentPageSection = this;
			new Waypoint({
				element: currentPageSection,
				handler: function(direction){
					if (direction == "down"){
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
						that.headerLinks.removeClass("is-current-link");
						$(matchingHeaderLink).addClass("is-current-link");
					}
				}
			});

			new Waypoint({
				element: currentPageSection,
				handler: function(direction){
					if (direction == "up"){
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
						that.headerLinks.removeClass("is-current-link");
						$(matchingHeaderLink).addClass("is-current-link");
					}
				},
				offset: "-38%"
			});
		});
	}
}

export default StickyHeader;