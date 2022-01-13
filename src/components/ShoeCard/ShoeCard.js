import React from "react";
import styled from "styled-components/macro";

import {COLORS, WEIGHTS} from "../../constants";
import {formatPrice, pluralize, isNewShoe} from "../../utils";
import Spacer from "../Spacer";

const variantStyles = {
  "on-sale": {
    "--content": `"Sale"`,
    "--background": COLORS.primary,
    "--strike": "line-through",
    "--price-color": COLORS.gray[700],
  },
  "new-release": {
    "--content": `"Just Released"`,
    "--background": COLORS.secondary,
  },
  default: {"--content": ""},
};

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  const variant =
    typeof salePrice === "number"
      ? "on-sale"
      : isNewShoe(releaseDate)
      ? "new-release"
      : "default";

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper style={variantStyles[variant]}>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {salePrice && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1;
  min-width: 350px;
`;

const Wrapper = styled.article`
  position: relative;

  &::after {
    position: absolute;
    top: 12px;
    right: -4px;

    font-size: ${14 / 16}rem;
    padding: 6px 10px;

    background: var(--background);
    color: ${COLORS.white};
    content: var(--content);
    border-radius: 2px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--price-color);
  text-decoration: var(--strike);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
