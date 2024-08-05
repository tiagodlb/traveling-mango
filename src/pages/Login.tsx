import React, { Component } from 'react'
import withRouter, { WithRouterProps } from '@/utils/withRouter'
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
import img from '@/assets/ju_boi.jpg'
import axios from 'axios'
import { Link } from 'react-router-dom'

interface LoginPageProps extends WithRouterProps {}

interface LoginPageState {
  email: string
  password: string
}

interface State {
  email: string
  password: string
}

class LoginPage extends Component<LoginPageProps, LoginPageState, State> {
  constructor(props: LoginPageProps) {
    super(props)
    this.state = {
      email: '',
      password: ''
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
    const { email, password } = this.state

    axios
      .post('https://traveling-mango-api.onrender.com/login', {
        email: email,
        password: password
      })
      .then(response => response.data)
      .then(data => {
        console.log('Success:', data)

        const { token, user } = data
        if (token) {
          localStorage.setItem('authToken', token)
          localStorage.setItem('email', email)
        }
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
        }

        this.props.navigate('/')
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  render() {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center w-full h-svh shadow-xl overflow-hidden load">
          <Card className="w-full max-w-xl h-full rounded-none">
            <CardHeader className="flex items-center justify-center">
              <CardTitle className="text-2xl">Entrar</CardTitle>
              <CardDescription>
                Coloque o seu email abaixo para entrar com a sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <form onSubmit={this.handleSubmit} className="grid w-full gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
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
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <CardFooter className="flex flex-col gap-5">
                  <Button type="submit" className="w-full">
                    Entrar
                  </Button>
                  <Link to={'/registrar'} className="w-full">
                    <Button type="button" className="w-full">
                      Cadastrar-se
                    </Button>
                  </Link>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
          <AspectRatio ratio={15 / 12} className="w-full h-full shadow-xl">
            <img src={img} alt="Photo of Julliany Araujo" className="w-full h-full" />
          </AspectRatio>
        </div>
      </>
    )
  }
}

export default withRouter(LoginPage)
