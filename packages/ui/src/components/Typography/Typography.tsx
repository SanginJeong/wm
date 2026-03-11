import styled from "@emotion/styled";
import { HTMLAttributes, ElementType } from "react";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2"
  | "caption"
  | "label";

type TypographyColor = "default" | "muted" | "primary" | "accent" | "error" | "success";

type TypographyProps = HTMLAttributes<HTMLElement> & {
  variant?: TypographyVariant;
  color?: TypographyColor;
  as?: ElementType;
};

const variantTagMap: Record<TypographyVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body1: "p",
  body2: "p",
  caption: "span",
  label: "label",
};

const StyledTypography = styled.p<TypographyProps>`
  ${({ variant = "body1", theme }) => {
    const styles: Record<TypographyVariant, string> = {
      h1: `
        font-size: ${theme.typography.fontSize["5xl"]};
        font-weight: ${theme.typography.fontWeight.bold};
        line-height: ${theme.typography.lineHeight.tight};
        letter-spacing: -0.02em;
      `,
      h2: `
        font-size: ${theme.typography.fontSize["4xl"]};
        font-weight: ${theme.typography.fontWeight.bold};
        line-height: ${theme.typography.lineHeight.tight};
        letter-spacing: -0.01em;
      `,
      h3: `
        font-size: ${theme.typography.fontSize["3xl"]};
        font-weight: ${theme.typography.fontWeight.bold};
        line-height: ${theme.typography.lineHeight.snug};
      `,
      h4: `
        font-size: ${theme.typography.fontSize["2xl"]};
        font-weight: ${theme.typography.fontWeight.semibold};
        line-height: ${theme.typography.lineHeight.snug};
      `,
      h5: `
        font-size: ${theme.typography.fontSize.xl};
        font-weight: ${theme.typography.fontWeight.semibold};
        line-height: ${theme.typography.lineHeight.snug};
      `,
      h6: `
        font-size: ${theme.typography.fontSize.lg};
        font-weight: ${theme.typography.fontWeight.semibold};
        line-height: ${theme.typography.lineHeight.normal};
      `,
      body1: `
        font-size: ${theme.typography.fontSize.md};
        font-weight: ${theme.typography.fontWeight.regular};
        line-height: ${theme.typography.lineHeight.relaxed};
      `,
      body2: `
        font-size: ${theme.typography.fontSize.sm};
        font-weight: ${theme.typography.fontWeight.regular};
        line-height: ${theme.typography.lineHeight.relaxed};
      `,
      caption: `
        font-size: ${theme.typography.fontSize.xs};
        font-weight: ${theme.typography.fontWeight.regular};
        line-height: ${theme.typography.lineHeight.normal};
      `,
      label: `
        font-size: ${theme.typography.fontSize.sm};
        font-weight: ${theme.typography.fontWeight.medium};
        line-height: ${theme.typography.lineHeight.normal};
      `,
    };
    return styles[variant];
  }}

  ${({ color = "default", theme }) => {
    const colors: Record<TypographyColor, string> = {
      default: `color: ${theme.colors.gray[900]};`,
      muted: `color: ${theme.colors.gray[500]};`,
      primary: `color: ${theme.colors.primary[500]};`,
      accent: `color: ${theme.colors.accent[500]};`,
      error: `color: ${theme.colors.error};`,
      success: `color: ${theme.colors.success};`,
    };
    return colors[color];
  }}
`;

const Typography = ({ variant = "body1", color = "default", as, ...props }: TypographyProps) => {
  const tag = as ?? variantTagMap[variant];
  return <StyledTypography as={tag} variant={variant} color={color} {...props} />;
};

export default Typography;
