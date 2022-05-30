import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const REVIEWS = gql`
  query GetReviews {
    reviews {
      data {
        id,
        attributes {
          title,
          body,
          rate,
          categories {
            data {
              id,
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`

export default function Homepage() {
  const { loading, error, data } = useQuery(REVIEWS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

  return (
    <div>
      {data.reviews.data.map(review => (
        <div key={review.id} className="review-card">
          <div className="rate">{review.attributes.rate}</div>
          <h2>{review.attributes.title}</h2>
          
          {review.attributes.categories.data.map(c => (
            <small key={c.id}>{c.attributes.name}</small>
          ))}

          <p>{review.attributes.body.substring(0, 200)}...</p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}
