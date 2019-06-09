import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { Container } from '@components/global';
import FormComponent from '@common/Form';


const Header = () => (
  <StaticQuery
    query={graphql`
      query {
        art_build: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "header-cars" }
        ) {
          childImageSharp {
            fluid(maxWidth: 1400) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <HeaderWrapper>
        <Container>
          <FormComponent />>
        </Container>
      </HeaderWrapper>
    )}
  />
);

const HeaderWrapper = styled.header`
  background-image: linear-gradient(80deg, ${props => props.theme.color.primaryGradient} ,${props => props.theme.color.orange.light});
  position:relative;
  :before{
    background-image: url('http://prod-upp-image-read.ft.com/5e9cca42-0e6e-11e8-a765-993b2440bd73');
    background-size: cover;
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    opacity: 0.4;
  }
  @media (max-width: ${props => props.theme.screen.md}) {
    padding:0;
  }
`;






export default Header;
