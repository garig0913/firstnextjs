import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import Link from "next/link";
import Chero from "../../components/Card/hero";
import GlobalContext from "../../context/GlobalContext";
import Offcanvas from "../Offcanvas";
import NestedMenu from "../NestedMenu";
import { device } from "../../utils";
import Logo from "../Logo";
import Logo2 from "../../assets/image/webp/logo.svg";
import { menuItems } from "./menuItems";

const SiteHeader = styled.header`
  padding: 0;
  position: absolute !important;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 999;
  @media ${device.lg} {
    position: fixed !important;
    transition: 0.4s;
    &.scrolling {
      transform: translateY(-100%);
      transition: 0.4s;
    }
    &.reveal-header {
      transform: translateY(0%);
      height:100px;
      box-shadow: 0 12px 34px -11px rgba(65, 62, 101, 0.1);
      z-index: 9999;
      //background: ${({ dark, theme }) => theme.colors.bg};
      background: rgb(45,133,192);
      background: linear-gradient(
          45deg, rgba(45,133,192,1) 0%, rgba(18,87,151,1) 24%, rgba(35,115,176,1) 24%, rgba(17,119,175,1) 61%, rgba(33,139,193,1) 61%, rgba(88,204,255,1) 100%);
    }
  }
`;

const ToggleButton = styled.button`
  color: ${({ dark, theme }) => theme.colors.front}!important;
  border-color: ${({ dark, theme }) => theme.colors.front}!important;
`;

const Menu = styled.ul`
  @media ${device.lg} {
    display: flex;
    justify-content: flex-end;
  }
  .dropdown-toggle {
    cursor: pointer;
  }
  > li {
    > .nav-link {
      @media ${device.lg} {
        color: ${({ dark, theme }) => theme.colors.front}!important;
        transition: 0.4s;
        align-items: center;
        display: inline-flex;
        font-size: 15px;
        font-weight: 700;
        line-height: 24px;
        padding-top: 18px !important;
        padding-bottom: 18px !important;
        padding-left: 18px !important;
        padding-right: 18px !important;
        text-transform: uppercase;
        &.dropdown-toggle:after {
          margin-left: 10px;
          position: relative;
          transform: rotate(90deg);
          top: 1px;
          content: "\\ea06";
          border: none;
          font-family: "Grayic";
          font-size: 24px;
          transition: 0.4s;
          font-weight: 900;
          line-height: 14px;
        }
      }
    }
    &.nav-item:hover > .nav-link,
    &.nav-item.active > .nav-link {
      color: ${({ theme }) => theme.colors.primary} !important;
      &:after {
        transform: rotate(-90deg);
      }
    }
  }
  .nav-item.dropdown {
    @media ${device.lg} {
      position: relative;
      z-index: 99;
    }
    &:hover {
      > .menu-dropdown {
        @media ${device.lg} {
          top: 90%;
          right: 0;
          opacity: 1;
          pointer-events: visible;
        }
      }
    }
  }
`;

const MenuDropdown = styled.ul`
  list-style: none;
  @media ${device.lg} {
    top: 110%;
    position: absolute;
    min-width: 227px;
    max-width: 227px;
    box-shadow: 0 52px 54px rgba(65, 62, 101, 0.3);

    background-color: ${({ dark, theme }) => theme.colors.light};
    padding: 15px 0px;
    z-index: 99;
    opacity: 0;
    transition: opacity 0.4s, top 0.4s;
    pointer-events: none;
    left: -90%;
    border: 1px solid #e5e5e5;
    border-radius: 0 0 10px 10px;
    display: block;
    border-top: ${({ theme }) => `3px solid ${theme.colors.primary}`};
  }
  > .drop-menu-item {
    color: ${({ theme }) => theme.colors.dark};
    font-size: 15px;
    font-weight: 300;
    letter-spacing: -0.5px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 10px;
    padding-bottom: 10px;

    a {
      color: ${({ theme }) => theme.colors.dark} !important;
      transition: all 0.3s ease-out;
      position: relative;
      display: flex;
      align-items: center;
      font-weight: 700;
      text-transform: uppercase;
      &.dropdown-toggle::after {
        margin-left: 10px;
        position: relative;
        top: 1px;
        content: "\\ea06";
        border: none;
        font-family: "Grayic";
        font-size: 24px;
        transition: 0.4s;
        font-weight: 900;
        line-height: 14px;
      }
    }

    &:hover,
    &.active {
      > a {
        color: ${({ theme }) => theme.colors.primary} !important;
        text-decoration: none;
        &::after {
          transform: rotate(180deg);
        }
      }
    }
    &.dropdown {
      position: relative;

      &:hover {
        > .menu-dropdown {
          @media ${device.lg} {
            top: 10px;
            opacity: 1;
            pointer-events: visible;
            transform: translateX(-100%);
          }
        }
      }
      > .menu-dropdown {
        border-top-color: ${({ theme }) => theme.colors.success};
        @media ${device.lg} {
          top: 10px;
          left: 0%;
          opacity: 0;
          transform: translateX(-110%);
          transition: 0.4s;
          pointer-events: none;
        }
        > .drop-menu-item {
          @media ${device.lg} {
            padding-left: 30px;
            padding-right: 30px;
          }
        }
      }
    }
  }
  &.dropdown-right {
    left: auto;
    right: -90%;
  }
`;

const Header = ({ isDark }) => {
  const gContext = useContext(GlobalContext);
  const [showScrolling, setShowScrolling] = useState(false);
  const [showReveal, setShowReveal] = useState(false);

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y < 0) {
      setShowScrolling(true);
    } else {
      setShowScrolling(false);
    }
    if (currPos.y < -300) {
      setShowReveal(true);
    } else {
      setShowReveal(false);
    }
  });
  return (
    <>
      <div className="">
      {/*<Chero/>*/}
      </div>
      <SiteHeader
        className={`sticky-header ${showScrolling ? "scrolling" : ""} ${
          showReveal ? "reveal-header" : ""
        }`}
        dark={isDark ? 1 : 0}
      >
        <Container fluid>
          <nav className="navbar pcollapsex-0 px-md-3 site-navbar offcanvas-active navbar-expand-lg navbar-light">
            {/* <!-- Brand Logo--> */}
            {/*<div className="brand-logo">*/}
              <Logo/>
            {/*</div>*/}
            <div className="collapse navbar-collapse">

              <div className="navbar-nav ml-lg-auto mr-3">
                <Menu
                  className="navbar-nav d-none d-lg-flex"
                  dark={isDark ? 1 : 0}
                >
                  <li className="nav-item">
                    <a
                        className="nav-link"
                        href="/#"
                    >
                      НҮҮР
                    </a>
                  </li>
                  {menuItems.map(
                    (
                      { label, isExternal = false, name, items, ...rest },
                      index
                    ) => {
                      const hasSubItems = Array.isArray(items);
                      return (
                        <React.Fragment key={name + index}>
                          {hasSubItems ? (
                            <li className="nav-item dropdown" {...rest}>
                              <a
                                className="nav-link dropdown-toggle"
                                role="button"
                                data-toggle="dropdown"
                                aria-expanded="false"
                                href="/#"
                                onClick={(e) => e.preventDefault()}
                              >
                                {label}
                              </a>
                              <MenuDropdown
                                className="menu-dropdown dropdown-right"
                                dark={isDark ? 1 : 0}
                              >
                                {items.map((subItem, indexSub) => {
                                  const hasInnerSubItems = Array.isArray(
                                    subItem.items
                                  );
                                  return (
                                    <React.Fragment
                                      key={subItem.name + indexSub}
                                    >
                                      {hasInnerSubItems ? (
                                        <li className="drop-menu-item dropdown">
                                          <a
                                            className="dropdown-toggle"
                                            role="button"
                                            data-toggle="dropdown"
                                            aria-expanded="false"
                                            href="/#"
                                            onClick={(e) => e.preventDefault()}
                                          >
                                            {subItem.label}
                                          </a>
                                          <MenuDropdown
                                            className="menu-dropdown dropdown-right"
                                            dark={isDark ? 1 : 0}
                                          >
                                            {subItem.items.map(
                                              (itemSubInner, indexSubInner) => {
                                                const hasInnerMostItems = Array.isArray(
                                                  itemSubInner.items
                                                );
                                                return (
                                                  <React.Fragment
                                                    key={
                                                      itemSubInner.name +
                                                      indexSubInner
                                                    }
                                                  >
                                                    {hasInnerMostItems ? (
                                                      <li className="drop-menu-item dropdown">
                                                        <a
                                                          className="dropdown-toggle"
                                                          role="button"
                                                          data-toggle="dropdown"
                                                          aria-expanded="false"
                                                          href="/#"
                                                          onClick={(e) =>
                                                            e.preventDefault()
                                                          }
                                                        >
                                                          {itemSubInner.label}
                                                        </a>
                                                        <MenuDropdown
                                                          className="menu-dropdown dropdown-right"
                                                          dark={isDark ? 1 : 0}
                                                        >
                                                          {itemSubInner.items.map(
                                                            (
                                                              itemLast,
                                                              indexLast
                                                            ) => (
                                                              <li
                                                                className="drop-menu-item"
                                                                key={
                                                                  itemLast.name +
                                                                  indexLast
                                                                }
                                                              >
                                                                {itemLast.isExternal ? (
                                                                  <a
                                                                    href={`${itemLast.name}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                  >
                                                                    {
                                                                      itemLast.label
                                                                    }
                                                                  </a>
                                                                ) : (
                                                                  <Link
                                                                    href={`/${itemLast.name}`}
                                                                  >
                                                                    <a>
                                                                      {
                                                                        itemLast.label
                                                                      }
                                                                    </a>
                                                                  </Link>
                                                                )}
                                                              </li>
                                                            )
                                                          )}
                                                        </MenuDropdown>
                                                      </li>
                                                    ) : (
                                                      <li className="drop-menu-item">
                                                        {itemSubInner.isExternal ? (
                                                          <a
                                                            href={`${itemSubInner.name}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                          >
                                                            {itemSubInner.label}
                                                          </a>
                                                        ) : (
                                                          <Link
                                                            href={`/${itemSubInner.name}`}
                                                          >
                                                            {itemSubInner.label}
                                                          </Link>
                                                        )}
                                                      </li>
                                                    )}
                                                  </React.Fragment>
                                                );
                                              }
                                            )}
                                          </MenuDropdown>
                                        </li>
                                      ) : (
                                        <li className="drop-menu-item">
                                          {subItem.isExternal ? (
                                            <a
                                              href={`${subItem.name}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              {subItem.label}
                                            </a>
                                          ) : (
                                            <Link href={`/${subItem.name}`}>
                                              <a>{subItem.label}</a>
                                            </Link>
                                          )}
                                        </li>
                                      )}
                                    </React.Fragment>
                                  );
                                })}
                              </MenuDropdown>
                            </li>
                          ) : (
                            <li className="nav-item" {...rest}>
                              {isExternal ? (
                                <a
                                  className="nav-link"
                                  href={`${name}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {label}
                                </a>
                              ) : (
                                <Link href={`/${name}`}>
                                  <a
                                    className="nav-link"
                                    role="button"
                                    aria-expanded="false"
                                  >
                                    {label}
                                  </a>
                                </Link>
                              )}
                            </li>
                          )}
                        </React.Fragment>
                      );
                    }
                  )}
                  <li className="nav-item">
                    <a
                        className="nav-link"
                        href="/"
                        target="_blank"
                    >
                      БИДНИЙ ТУХАЙ
                    </a>
                  </li>
                  {/* Open about modal */}
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="/#"
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   gContext.toggleAbout();
                      // }}
                    >
                      Үйлчилгээ
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="/"
                      target="_blank"
                    >
                      МЭДЭЭ МЭДЭЭЛЭЛ
                    </a>
                  </li>

                  {/* Open contact modal */}
                  <li className="nav-item">
                    <a
                        className="nav-link"
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                          gContext.toggleContact();
                        }}
                    >
                      ХОЛБОО БАРИХ
                    </a>
                  </li>
                </Menu>
              </div>
            </div>

            <ToggleButton
              className={`navbar-toggler btn-close-off-canvas ml-3 ${
                gContext.visibleOffCanvas ? "collapsed" : ""
              }`}
              type="button"
              data-toggle="collapse"
              data-target="#mobile-menu"
              aria-controls="mobile-menu"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={gContext.toggleOffCanvas}
              dark={isDark ? 1 : 0}
            >
              {/* <i className="icon icon-simple-remove icon-close"></i> */}
              <i className="icon icon-menu-34 icon-burger d-block"></i>
            </ToggleButton>
          </nav>
        </Container>
      </SiteHeader>
      <Offcanvas
        show={gContext.visibleOffCanvas}
        onHideOffcanvas={gContext.toggleOffCanvas}
      >
        <NestedMenu menuItems={menuItems} />
      </Offcanvas>
    </>
  );
};
export default Header;
