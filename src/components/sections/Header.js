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
          <Grid>
            <Art>
              <Text>
                <h1>
                Hacemos cotizar tu auto  
                <br />
                en mas de 30 agencias y concesionarios.
                </h1>
                <br />
              </Text>
              <Img fluid={data.art_build.childImageSharp.fluid} />
            </Art>
            <FormComponent />
          </Grid>
        </Container>
      </HeaderWrapper>
    )}
  />
);

const HeaderWrapper = styled.header`
  background-color: ${props => props.theme.color.primary};
  background-image: linear-gradient(80deg, ${props => props.theme.color.primary} ,${props => props.theme.color.orange.light});
  padding: 128px 0;
  @media (max-width: ${props => props.theme.screen.md}) {
    padding:0;
  }
`;

const Art = styled.figure`
  width: 100%;
  margin: 0;

  @media (max-width: ${props => props.theme.screen.md}) {
    .gatsby-image-wrapper{
      display:none;
    }
  }

  > div {
    width: 120%;
    margin-bottom: -4.5%;

    h1{
      color:white;
    }
    @media (max-width: ${props => props.theme.screen.md}) {
      width: 100%;
      h1{
        font-size:1rem;
        line-height: 1;
      }
      img{
        display:none;
      }
    }
  }
`;

const Text = styled.div`
  justify-self: center;
  color:white;
  @media (max-width: ${props => props.theme.screen.md}) {
    justify-self: start;
    line-height: 1;
  }
  h1{
    font-weight:bold;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  align-items: center;
  grid-gap: 15%;

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    grid-gap: 15px;

    > ${Art} {
      order: 0;
    }

    > ${Text} {
      h1{
        font-size:12px;
      }
    }

  }
`;




export default Header;
