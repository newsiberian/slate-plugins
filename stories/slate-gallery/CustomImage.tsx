import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export function CustomImage({ image, onLoad, readOnly }) {
  if (
    readOnly &&
    typeof image.description === 'string' &&
    image.description.length
  ) {
    return (
      <Tooltip title={image.description}>
        <Image src={image.src} alt={image.description} onLoad={onLoad} />
      </Tooltip>
    );
  }
  return <Image src={image.src} alt={image.description} onLoad={onLoad} />;
}
