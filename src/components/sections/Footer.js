import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';

import { Container } from '@components/global';
import ExternalLink from '@common/ExternalLink';

import InstagramIcon from '@static/icons/instagram.svg';
import TwitterIcon from '@static/icons/twitter.svg';
import Logo from '../common/Logo';

const SOCIAL = [
  {
    icon: InstagramIcon,
    link: 'https://instagram.com/ajay_ns',
  },
  {
    icon: TwitterIcon,
    link: 'https://twitter.com/ajayns08',
  },
];

const Footer = () => (
  <StaticQuery
    query={graphql`
      query {
        art_pot: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "customers_pot" }
        ) {
          childImageSharp {
            fluid(maxWidth: 960) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <React.Fragment>
        <FooterWrapper>
          <StyledContainer>
            <Copyright>
              <Logo backgroundWhite={false} isFooter={true}/>
            </Copyright>
            <SocialIcons>
              {SOCIAL.map( ( icon, key ) => (
                <ExternalLink key={key} href={icon.link}>
                  <img src={icon.icon} alt="link" />
                </ExternalLink>
              ))}
            </SocialIcons>
          </StyledContainer>
        </FooterWrapper>
      </React.Fragment>
    )}
  />
);

const SocialIcons = styled.div`
  display: flex;

  img {
    margin: 0 8px;
    width: 24px;
    height: 24px;
  }

  @media (max-width: ${props => props.theme.screen.sm}) {
    margin-top: 40px;
  }
`;

const FooterWrapper = styled.footer`
  background-color: ${props => props.theme.color.primary};
  padding: 32px 0;
`;

const Copyright = styled.div`
  font-family: ${props => props.theme.font.secondary};
  ${props => props.theme.font_size.small};
  color: ${props => props.theme.color.white.regular};
  line-height: 20px;
  display: inline-flex;
  height: 20px;
  align-items: center;
  a {
    text-decoration: none;
    color: white;
  }
  h2{
    font-weight:bold;
    font-size:20px;
    text-transform:uppercase;
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${props => props.theme.screen.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

export default Footer;
