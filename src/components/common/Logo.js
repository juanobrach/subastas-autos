import React from "react";
import LogoImg from '../../images/logos/subastasautos/subastasautos280x80-rect-web-naranja-bg-transparente.png';
import LogoImgWhite from '../../images/logos/subastasautos/subastasautos280x80-rect-web-naranja-bg-transparente.jpg';

import logoImgFooterWhite from '../../images/logos/subastasautos/subastasautos110x110-square-ig-blanco-bg-transparante.png'

import styled from 'styled-components';

const Logo = ({backgroundWhite, isFooter})=>{  

  const Img = styled.img`
   height:60px;
   display:inline;
  `;

  let logoImg = ( backgroundWhite ? LogoImgWhite  : LogoImg );

  if( isFooter ){
      logoImg = logoImgFooterWhite;
  }

  return <Img src={logoImg} alt="" /> 
}

export default Logo;