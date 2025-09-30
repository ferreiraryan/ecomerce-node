import { Container, Box, Typography } from '@mui/material';
// A importação correta e moderna para o Grid v2
import Grid from '@mui/material/Grid';

export function HomePage() {
  const mockProducts = [
    { id: 1, name: 'Produto 1' },
    { id: 2, name: 'Produto 2' },
    { id: 3, name: 'Produto 3' },
    { id: 4, name: 'Produto 4' },
    { id: 5, name: 'Produto 5' },
    { id: 6, name: 'Produto 6' },
  ];

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Nossos Produtos
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {mockProducts.map((product) => (
          <Grid key={product.id} size={12}>
            <Box sx={{ border: 1, borderColor: 'grey.300', p: 2, borderRadius: 2 }}>
              <Typography variant="h6">{product.name}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

