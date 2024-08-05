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
  destinyId: number
  id: number
  created_at: string
  title: string
  content: string
  imgURL: string | null
  favoritedBy: number
  Attraction: Attraction[]
}

interface State {
  atracoes: Destino[]
  loading: boolean
  error: string | null
  searchQuery: string
}

class Destiny extends Component<{}, State> {
  state: State = {
    atracoes: [],
    searchQuery: '',
    loading: true,
    error: null
  }

  componentDidMount() {
    this.fetchatracoes()
  }

  fetchatracoes = async () => {
    try {
      const response = await axios.get('https://traveling-mango-api.onrender.com/attractions')
      this.setState({ atracoes: response.data, loading: false })
    } catch (error) {
      console.error('Error fetching atracoes:', error)
      this.setState({ error: 'Error fetching data', loading: false })
    }
  }

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value })
  }

  filteratracoes = () => {
    const { atracoes, searchQuery } = this.state
    if (!searchQuery) return atracoes
    const query = searchQuery.toLowerCase()
    return atracoes.filter(
      destino =>
        destino.title.toLowerCase().includes(query) || destino.content.toLowerCase().includes(query)
    )
  }

  render() {
    const { atracoes, loading, error } = this.state
    const filteredatracoes = this.filteratracoes()

    if (loading) {
      return <div>Loading...</div>
    }

    if (error) {
      return <div>{error}</div>
    }

    if (!atracoes) {
      return <div>Não encontramos nenhum destino com esse identificador</div>
    }

    return (
      <div>
        <Header />
        <article className="flex flex-col w-full justify-center items-center gap-5 p-5 load">
          <h1 className="text-2xl">Todos os nossos Atrativos</h1>
          <form className="flex-1 sm:flex-initial py-5">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground text-black" />
              <Input
                type="search"
                placeholder="Encontre experiências..."
                value={this.state.searchQuery}
                onChange={this.handleSearchChange}
                className="pl-8 sm:w-[500px] md:w-[400px] lg:w-[500px] text-black"
              />
            </div>
          </form>
          <div className="grid justify-evenly grid-rows-6 grid-cols-3 gap-4 w-full h-full">
            {filteredatracoes.map(attrativo => (
              <CardDestiny
                key={attrativo.id}
                type="destino"
                id={attrativo.destinyId}
                titulo={attrativo.title}
                desc={attrativo.content}
                imgUrl={attrativo.imgURL as string}
              />
            ))}
          </div>
        </article>
      </div>
    )
  }
}

export default Destiny
