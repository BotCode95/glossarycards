import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { Terms, Term } from '../../types'
import { api } from '@/api'
import { TermCard } from '../../components/Term/TermCard'

interface Props {
	term: Term
}

const Term = ({ term }: Props) => {
	console.log(term)
	return <TermCard term={term} />
}
export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const { data } = await api.get<Terms>('/glossary')
	return {
		paths: data.terms.map(({ id }) => ({
			params: {
				id: id.toString(),
			},
		})),
		fallback: false,
	}
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { id } = params as { id: string }
	const { data } = await api.get<Term>(`/glossary/${id}`)
	return {
		props: {
			term: data,
		},
	}
}
export default Term
