import { gql } from "@apollo/client";

export const GET_DEALS = gql`
  query deals {
    deals {
      id
      status
      customer {
        id
        email
        name
      }
      street
      city
      state
      zip
      images
      roomAreaInMeters
      peopleRequired
      customerId
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_DEAL = gql`
  mutation createDeal(
    $status: DealStatus!
    $customerId: ID!
    $street: String!
    $city: String!
    $state: String!
    $zip: String!
    $images: [String!]
    $roomAreaInMeters: Int!
    $peopleRequired: Int!
  ) {
    createDeal(
      status: $status
      customerId: $customerId
      street: $street
      city: $city
      state: $state
      zip: $zip
      images: $images
      roomAreaInMeters: $roomAreaInMeters
      peopleRequired: $peopleRequired
    ) {
      id
      status
      street
      city
      state
      zip
      images
      roomAreaInMeters
      peopleRequired
      customerId
      customer {
        id
        name
        email
      }
      createdAt
      updatedAt
    }
  }
`;
