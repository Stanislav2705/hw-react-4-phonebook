import { string, number, arrayOf, shape } from 'prop-types'
import { ListItems,Button,Text } from './PhoneBookList.styled'


export default function PhoneBookList({ items,removeContact }) {
  const elements = items.map(({ name, number,id }) => {
    return <ListItems key={id}>
      <Text>{name}: {number}</Text>
      <Button onClick={() => removeContact(id)}>Delete</Button>
    </ListItems>
  })
  
  return (
    <div>{elements}</div>
  )
}

PhoneBookList.defaultProps = {
  items: []
}

PhoneBookList.protoTypes = {
  events: arrayOf(
    shape({
      id: string.isRequired,
      name: string.isRequired,
      number: number.isRequired
    })
  ).isRequired,
}
