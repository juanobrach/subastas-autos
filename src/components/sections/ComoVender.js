import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { Section, Container } from '@components/global';

const ComoVender = () => (
  <StaticQuery
    query={graphql`
      query {
        art_fast: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "step1" }
        ) {
          childImageSharp {
            fixed(width: 250, height:250) {
              ...GatsbyImageSharpFixed
            }
          }
        }

        art_learn: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "step2" }
        ) {
          childImageSharp {
            fixed(width: 250, height:250) {
              ...GatsbyImageSharpFixed
            }
          }
        }

        art_ideas: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "step3" }
        ) {
          childImageSharp {
            fixed(width: 250, height:250) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => (
      <Section id="como-vender">
        <Container>
          <Grid>
            <div>
              <Art>
                <Img fixed={data.art_fast.childImageSharp.fixed} />
              </Art>
              <div>
                <h2>Cotización online</h2>
                <p>
                  Obtené una cotización inmediata y programá una cita a través de nuestro sitio web.
                </p>
              </div>
            </div>
            <div>
              <Art>
                <Img fixed={data.art_learn.childImageSharp.fixed} />
              </Art>
              <div>
                <h2>Inspección sin costo</h2>
                <p>
                 Visítanos para una evaluación gratuita de tu auto en alguno de nuestros puntos de compra.
                </p>
              </div>
            </div>
            <div>
              <Art>
                <Img fixed={data.art_ideas.childImageSharp.fixed} />
              </Art>
              <div>
                <h2>Cobro contra entrega</h2>
                <p>
                  Aceptá nuestra oferta, entregá el auto y te pagamos de inmediato.
                  <br />
                  <br />
                  Conoce más →
                </p>
              </div>
            </div>
          </Grid>
        </Container>
      </Section>
    )}
  />
);


const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
  margin: 24px 0;
  text-align: center;
  align-items: baseline;
  h2{
    color: black;
  }
  ${props =>
    props.inverse &&
    `
    text-align: left;
    grid-template-columns: 2fr 3fr;
  `}

  h2 {
    margin-bottom: 16px;
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    text-align: center;
    margin-bottom: 96px;

    &:last-child {
      margin-bottom: 24px;
    }

    ${props =>
      props.inverse &&
      `
        ${Art} {
          order: 2;
        }
    `}
  }
`;

const Art = styled.figure`
  margin: 0;
  max-width: 380px;
  width: 100%;
`;

export default ComoVender;
