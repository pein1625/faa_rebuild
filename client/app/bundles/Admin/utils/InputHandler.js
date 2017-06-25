export function handleInputChange(e) {
  let input = e.target.name;
  this.setState({[input]: e.target.value});
}
