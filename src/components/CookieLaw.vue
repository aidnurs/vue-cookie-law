<template>
  <transition appear :name="transitionName">
    <div class="Cookie" :class="[containerPosition, cookieTheme]" v-if="isOpen">
      <div class="Cookie__content">
        <slot name="message">{{ message }}</slot>
      </div>
      <div class="Cookie__buttons">
        <div class="container">
          <div id="button1">
            <a :target="target" :href="buttonLink" v-if="externalButtonLink" :class="buttonClass">{{ buttonLinkText }}</a>
            <router-link :to="buttonLink" v-if="internalButtonLink" :class="buttonClass">{{ buttonLinkText }}</router-link>
            <div :class="buttonClass" @click="accept">{{ buttonText }}</div>
          </div>
          <div id="button2">
            <a :target="target" :href="buttonLink" v-if="externalButtonLink" :class="buttonClass">{{ buttonLinkText }}</a>
            <router-link :to="buttonLink" v-if="internalButtonLink" :class="buttonClass">{{ buttonLinkText }}</router-link>
            <div :class="buttonClass" @click="accept">{{ buttonText }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import * as Cookie from "tiny-cookie";
export default {
  props: {
    buttonText: {
      type: String,
      default: "Akzeptieren"
    },
    buttonText2: {
      type: String,
      default: "Abbrechen"
    },
    buttonLink: {
      type: [String, Object],
      required: false
    },
    buttonLinkText: {
      type: String,
      default: "More info"
    },
    buttonLinkNewTab: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default:
        "Diese Website nutzt Cookies. Wir möchten Ihnen den bestmöglichen Service bieten, dazu speichern wir Informationen über Ihren Besuch in sogenannten Cookies. Durch die Nutzung dieser Internetseite erklären Sie sich mit der Verwendung von Cookies einverstanden. <a target="_blank" href="http://at.gsk.com/de-at/cookie-policy/">Hier finden Sie unsere Cookie-Richtlinien</a>"
    },
    theme: {
      type: String,
      default: "base"
    },
    /**
     * Cookie Container position
     * bottom, top
     * @type {Object}
     */
    position: {
      type: String,
      default: "top"
    },
    /**
     * Transition name has following possibilities
     * slideFromBottom
     * slideFromTop
     * fade
     * @type {Object}
     */
    transitionName: {
      type: String,
      default: "slideFromBottom"
    },
    buttonClass: {
      type: String,
      default: "Cookie__button"
    }
  },
  data() {
    return {
      supportsLocalStorage: true,
      isOpen: false
    };
  },
  computed: {
    containerPosition() {
      return `Cookie--${this.position}`;
    },
    cookieTheme() {
      return `Cookie--${this.theme}`;
    },
    externalButtonLink() {
      return typeof this.buttonLink === "string" && this.buttonLink.length;
    },
    internalButtonLink() {
      return (
        typeof this.buttonLink === "object" &&
        this.buttonLink != null &&
        Object.keys(this.buttonLink).length
      );
    },
    target() {
      return this.buttonLinkNewTab ? "_blank" : "_self";
    }
  },
  created() {
    // Check for availability of localStorage
    try {
      const test = "__vue-cookielaw-check-localStorage";

      window.localStorage.setItem(test, test);
      window.localStorage.removeItem(test);
    } catch (e) {
      console.error(
        "Local storage is not supported, falling back to cookie use"
      );
      this.supportsLocalStorage = false;
    }

    if (!this.getVisited() === true) {
      this.isOpen = true;
    }
  },
  methods: {
    setVisited() {
      if (this.supportsLocalStorage) {
        localStorage.setItem("cookie:accepted", true);
      } else {
        Cookie.set("cookie:accepted", true);
      }
    },
    getVisited() {
      if (this.supportsLocalStorage) {
        return localStorage.getItem("cookie:accepted");
      } else {
        return Cookie.get("cookie:accepted");
      }
    },
    accept() {
      this.setVisited();
      this.isOpen = false;
      this.$emit("accept");
    }
  }
};
</script>

<style lang="scss">
@import "~@nextindex/next-scss/next-scss.scss";

.Cookie {
  position: fixed;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 9999;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-direction: column;

  > * {
    margin: rem(15) 0;
    align-self: center;
  }

  @include media($sm-up) {
    flex-flow: row;

    > * {
      margin: 0;
    }
  }
}

.Cookie--top {
  top: 0;
  left: 0;
  right: 0;
}

.Cookie--bottom {
  bottom: 0;
  left: 0;
  right: 0;
}
.Cookie__buttons {
  display: flex;
  flex-direction: column;

  > * {
    margin: rem(5) 0;
  }

  @include media($sm-up) {
    flex-direction: row;
    > * {
      margin: 0 rem(15);
    }
  }
}
.Cookie__button {
  cursor: pointer;
  align-self: center;
}

@mixin generateTheme(
  $theme,
  $backgroundColor,
  $fontColor,
  $buttonBackgroundColor,
  $buttonFontColor: #fff,
  $buttonRadius: 0
) {
  .Cookie--#{$theme} {
    background: $backgroundColor;
    color: $fontColor;
    padding: 1.25em;

    .Cookie__button {
      background: $buttonBackgroundColor;
      padding: 0.625em 3.125em;
      color: $buttonFontColor;
      border-radius: $buttonRadius;

      &:hover {
        background: darken($buttonBackgroundColor, 10%);
      }
    }
  }
}

@include generateTheme("base", #f1f1f1, #232323, #97d058);
@include generateTheme("base--rounded", #f1f1f1, #232323, #97d058, #fff, 20px);
@include generateTheme("blood-orange", #424851, #fff, #e76a68);
@include generateTheme(
  "blood-orange--rounded",
  #424851,
  #fff,
  #e76a68,
  #fff,
  20px
);
@include generateTheme("dark-lime", #424851, #fff, #97d058);
@include generateTheme(
  "dark-lime--rounded",
  #424851,
  #fff,
  #97d058,
  #fff,
  20px
);
@include generateTheme("royal", #fbc227, #232323, #726cea, #fff);
@include generateTheme("royal--rounded", #fbc227, #232323, #726cea, #fff, 20px);

.slideFromTop-enter,
.slideFromTop-leave-to {
  transform: translate(0px, -12.5em);
}

.slideFromTop-enter-to,
.slideFromTop-leave {
  transform: translate(0px, 0px);
}

.slideFromBottom-enter,
.slideFromBottom-leave-to {
  transform: translate(0px, 12.5em);
}

.slideFromBottom-enter-to,
.slideFromBottom-leave {
  transform: translate(0px, 0px);
}

.slideFromBottom-enter-active,
.slideFromBottom-leave-active,
.slideFromTop-enter-active,
.slideFromTop-leave-active {
  transition: transform 0.4s ease-in;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
