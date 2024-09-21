import { TableSectionProps } from '../components/sections/one-col/table-section';

export const tableSectionData: TableSectionProps = {
  sectionTitle: 'Cómo \n\n*funciona*',
  tables: [
    {
      title: 'Emissões de Gases de Efeito Estufa (t CO2e)',
      heads: ['2019', '2020', '2021'],
      rows: [
        {
          head: 'Escopo 1',
          cells: ['2.967', '188.745', '-'],
        },
        {
          head: 'Escopo 2',
          cells: ['9.558', '12.610', '-'],
        },
        {
          head: 'Escopo 3',
          cells: ['159.320', '590.720', '-'],
        },
        {
          head: 'Total',
          cells: ['171.845', '792.075', '-'],
        },
      ],
    },
    {
      title: 'Emissões de Gases (t CO2e)',
      heads: ['2019', '2020', '2021'],
      rows: [
        {
          head: 'T CO2e / Total de colaboradores',
          cells: ['-', '50.95', '-'],
        },
        {
          head: 'Kg CO2e / Total de colaboradores',
          cells: ['-', '12.610', '-'],
        },
        {
          head: 'T CO2e / Total de Compradores',
          cells: ['-', '0.013', '-'],
        },
        {
          head: 'Kg CO2e / Total de Compradores',
          cells: ['-', '12.921', '-'],
        },
        {
          head: 'T CO2e / Total de Usuários',
          cells: ['-', '188.745', '-'],
        },
        {
          head: 'Kg CO2e / Total de Usuários',
          cells: ['-', '5.978', '-'],
        },
      ],
    },
  ],
};
