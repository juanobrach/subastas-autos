import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';

import { Section, Container } from '@components/global';



const UsedBy = () => (
  <StaticQuery
    query={graphql`
      query {
        art_story: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "tell_story" }
        ) {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <Section id="¿quiénes-somos?" accent style={{ backgroundColor:'#eceff1' }}>
        <StyledContainer>
          <div>
            <h1>¿Por qué vender con nosotros?</h1>
            <h4>Porque en Argentina somos la forma más práctica, segura y conveniente de vender tu auto.</h4>
            <Points>
              <li>Cobras tu auto al finalizar el trámite.</li>
              <li>Ganá tiempo para vos, nosotros te ayudamos con los trámites.</li>
              <li>Hacé la transacción de forma segura en nuestros centros de inspección.</li>
              <li>Recibimos tu auto aún con deudas.</li>
              <li>Seguridad y confianza a toda prueba.</li>
            </Points>
          </div>
        </StyledContainer>
      </Section>
    )}
  />
);


const StyledContainer = styled(Container)`
  display: flex;
  justify-content: flex-start;
  position: relative;
  flex-flow:row;
  color:black;
  @media (max-width: ${props => props.theme.screen.md}) {
    justify-content: center;
  }
`;

const Points = styled.ul`
  list-style-type:none;
  padding:0;
  li{
    border-bottom:1px solid black;
    padding: 1em 0;
  }
`

export default UsedBy;
