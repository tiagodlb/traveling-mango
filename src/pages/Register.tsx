import React, { Component } from 'react'
import Header from '@/components/Header'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import img from '@/assets/leo-castro-traskgNjqjU-unsplash.jpg'
import axios from 'axios'
import withRouter, { WithRouterProps } from '@/utils/withRouter'

interface RegisterPageProps extends WithRouterProps {}

interface RegisterPageState {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface State {
  name: string
  email: string
  password: string
  confirmPassword: string
}

class RegisterPage extends Component<RegisterPageProps, RegisterPageState, State> {
  constructor(props: RegisterPageProps) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target

    this.setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    const { name, email, password } = this.state

    axios
      .post('https://traveling-mango-api.onrender.com/register', {
        email,
        name,
        password
      })
      .then(response => response.data)
      .then(data => {
        console.log('Success:', data)
        this.props.navigate('/entrar') // Redirect to the home page or another route
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  render() {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center w-full h-svh overflow-hidden load">
          <Card className="w-full max-w-xl h-full rounded-none">
            <CardHeader className="flex items-center justify-center">
              <CardTitle className="text-2xl">Registrar-se</CardTitle>
              <CardDescription>Registre-se no site e obtenha mais funcionalidades</CardDescription>
            </CardHeader>
            <CardContent className="grid">
              <form onSubmit={this.handleSubmit} className="grid w-full gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Fulano"
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@exemplo.com"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <CardFooter className="flex flex-col gap-5">
                  <Button type="submit" className="w-full">
                    Cadastrar
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
          <AspectRatio ratio={16 / 9} className="w-full h-full">
            <img src={img} alt="Photo by Seiji" className="w-full h-full" />
          </AspectRatio>
        </div>
      </>
    )
  }
}

export default withRouter(RegisterPage) // Wrap withRouter
