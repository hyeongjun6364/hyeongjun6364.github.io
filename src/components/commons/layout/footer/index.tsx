import styled from "@emotion/styled";

const FooterWrapper = styled.footer`
  background-color: #5eb6f6;
  color: #fff;
  height: 100%; /* Adjust the height of the footer */
  display: flex;
  align-items: center;
`;

const FooterContent = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  padding: 0 20px;
  width: 100%;
`;

const FooterLinks = styled.div`
  display: flex;
  color: #fff;
  font-size: 14px;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin-right: 20px;
  font-size: 16px; /* Adjust the font size for footer links */
  transition: color 0.2s ease;

  &:hover {
    color: #ccc;
  }

  @media (min-width: 370px) and (max-width: 450px) {
    color: #fff;
    text-decoration: none;
    margin-right: 20px;
    font-size: 8px; /* Adjust the font size for footer links */
    transition: color 0.2s ease;

    &:hover {
      color: #ccc;
    }
  }

  @media (max-width: 369px) {
    color: #fff;
    text-decoration: none;
    margin-right: 20px;
    font-size: 3px; /* Adjust the font size for footer links */
    transition: color 0.2s ease;

    &:hover {
      color: #ccc;
    }
  }
`;

const FooterSocialIcons = styled.div`
  display: flex;
`;

const SocialIcon = styled.a`
  color: #fff;
  font-size: 20px;
  margin-right: 15px;
  transition: color 0.2s ease;

  &:hover {
    color: #ccc;
  }
`;

const Copyright = styled.p`
  color: #fff;
  font-size: 9px;
`;

const Footer = (): JSX.Element => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterLinks>
          <FooterLink href="#">Home</FooterLink>
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Services</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </FooterLinks>
        <FooterSocialIcons>
          <SocialIcon href="#">
            <i className="fab fa-facebook-f"></i>
          </SocialIcon>
          <SocialIcon href="#">
            <i className="fab fa-twitter"></i>
          </SocialIcon>
          <SocialIcon href="#">
            <i className="fab fa-instagram"></i>
          </SocialIcon>
        </FooterSocialIcons>
      </FooterContent>
      <Copyright>
        © 2023 Solvor Company. All rights reserved.{" "}
        {/* Replace with your copyright information */}
      </Copyright>
    </FooterWrapper>
  );
};

export default Footer;
