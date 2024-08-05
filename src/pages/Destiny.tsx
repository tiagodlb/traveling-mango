import React, { Component } from 'react'
import axios from 'axios'
import CardDestiny from '@/components/CardDestiny'
import Header from '@/components/Header'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface Attraction {
  destinyId: number
  title: string
  content: string
  imgURL: string | null
}

interface Destino {
  id: number
  created_at: string
  title: string
  content: string
  imgURL: string | null
  favoritedBy: number
  Attraction: Attraction[]
}

interface State {
  destinos: Destino[]
  loading: boolean
  error: string | null
  searchQuery: string
}

class Destiny extends Component<{}, State> {
  state: State = {
    destinos: [],
    searchQuery: '',
    loading: true,
    error: null
  }

  componentDidMount() {
    this.fetchDestinos()
  }

  fetchDestinos = async () => {
    try {
      const response = await axios.get('https://traveling-mango-api.onrender.com/destinies')
      this.setState({ destinos: response.data, loading: false })
    } catch (error) {
      console.error('Error fetching destinos:', error)
      this.setState({ error: 'Error fetching data', loading: false })
    }
  }

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value })
  }

  filterDestinos = () => {
    const { destinos, searchQuery } = this.state
    if (!searchQuery) return destinos
    const query = searchQuery.toLowerCase()
    return destinos.filter(
      destino =>
        destino.title.toLowerCase().includes(query) || destino.content.toLowerCase().includes(query)
    )
  }

  render() {
    const { destinos, loading, error } = this.state
    const filteredDestinos = this.filterDestinos()

    if (loading) {
      return <div>Loading...</div>
    }

    if (error) {
      return <div>{error}</div>
    }

    if (!destinos) {
      return <div>Não encontramos nenhum destino com esse identificador</div>
    }

    return (
      <div>
        <Header />
        <article className="flex flex-col w-full justify-center items-center gap-5 p-5 load">
          <h1 className="text-2xl">Todos os nossos Destinos</h1>
          <form className="flex-1 sm:flex-initial py-5">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground text-black" />
              <Input
                type="search"
                placeholder="Procure aventuras..."
                value={this.state.searchQuery}
                onChange={this.handleSearchChange}
                className="pl-8 sm:w-[500px] md:w-[400px] lg:w-[500px] text-black"
              />
            </div>
          </form>
          <div className="grid justify-evenly grid-rows-4 grid-cols-3 gap-8 w-full h-full">
            {filteredDestinos.map(destino => (
              <CardDestiny
                key={destino.id}
                type="destino"
                id={destino.id}
                titulo={destino.title}
                desc={destino.content}
                imgUrl={destino.imgURL as string}
              />
            ))}
          </div>
        </article>
      </div>
    )
  }
}

export default Destiny
