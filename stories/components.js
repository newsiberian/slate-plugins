import styled from '@emotion/styled';

// tslint:disable-next-line
export const Button = styled('button')`
  cursor: pointer;
`;

// tslint:disable-next-line
export const Menu = styled('div')`
  & > * {
    display: inline-block;
  }
  & > * + * {
    margin-left: 15px;
  }
`;

// tslint:disable-next-line
export const Toolbar = styled(Menu)`
  position: relative;
  padding: 1px 18px 17px;
  margin: 0 -20px;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
`;
