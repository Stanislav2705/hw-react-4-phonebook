import { Component } from "react";
import { nanoid } from "nanoid";
import { Label,Input,Block,Text,Button,Form,Container } from "./FormPhoneBook.styled";


export default class FormPhoneBook extends Component {
  state = {
    name: '',
    number: '',
    invalidForm: false,
  }

  nameId = nanoid();
  numberId = nanoid();

  handleChange = (e) => {
    const {name,value} = e.target
    this.setState({
      [name]: value,
      invalidForm: false,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    const isValid = this.validateForm(this.state);
    if (isValid) {
      this.props.onSubmit({name,number})
      this.setState({
        name: '',
        number: '',
      })
    } else {
      this.setState({
        invalidForm: true,
      })
    }

  }

  validateForm = (data) => {
    const isValid = !!data.name
    return isValid;
  }

  render() {
    const { nameId, numberId, handleSubmit, handleChange } = this;
    const { invalidForm } = this.state;
    return (
      <Form onSubmit={handleSubmit}>
        <Container>
            <Block>
              <Label htmlFor={nameId}><Text>Name</Text></Label>
              <Input
                id={nameId}
                name="name"
                type="text"
                value={this.state.name}
                onChange={handleChange}
              minLength={3}
              autoComplete="off"
              />
            </Block>
            <Block>
              <Label htmlFor={numberId}><Text>Number</Text></Label>
              <Input
                id={numberId}
                type="tel"
                name="number"
                value={this.state.number}
                onChange={handleChange}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              autoComplete="off"
              />
          </Block>
          </Container>
            <Button>Add contact</Button>
            {invalidForm ? <div>Please fill in the fields</div> : null}
          </Form>
    )
  }
}
