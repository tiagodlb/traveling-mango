import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import { AspectRatio } from './ui/aspect-ratio'

interface MyProps {
  id: number
  titulo: string
  desc: string
  imgUrl: string
  type: 'destino' | 'atrativo'
}

// Definindo a classe do componente
class CardDestiny extends Component<MyProps> {
  constructor(props: MyProps) {
    super(props)
  }

  render() {
    const { id, titulo, desc, imgUrl, type } = this.props
    return (
      <>
        <Card className="w-[480px] shadow-md hover:bg-[#FAFAFA]">
          <Link to={type === 'destino' ? `/destinos/${id}` : `/atrativos/${id}`}>
            <CardHeader>
              <CardTitle>{titulo}</CardTitle>
              <CardDescription className="overflow-hidden whitespace-nowrap text-ellipsis">
                {desc}
              </CardDescription>{' '}
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col items-center justify-center w-full h-40 border-2 overflow-hidden">
                  <AspectRatio ratio={16 / 9}>
                    <img src={imgUrl} className="w-full h-full" />
                  </AspectRatio>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
      </>
    )
  }
}

export default CardDestiny
