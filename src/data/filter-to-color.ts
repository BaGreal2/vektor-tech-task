import { Filter } from '@/types'

export const filterToColor: { [key in Filter]: string | null } = {
  all: null,
  planned: '#36B102',
  unplanned: '#EE8A05',
  emergency: '#F53A3F'
}
