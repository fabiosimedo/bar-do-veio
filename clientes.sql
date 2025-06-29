clientes {
	id integer pk increments unique
	nome string(255)
	telefone integer(15)
	created_at datetime
	update_at datetime
}

produtos {
	id integer pk increments unique
	cliente_id integer
	produto string(255)
	preco integer
	created_at decimal
	updated_at decimal
}

pagamentos {
	id integer pk increments unique
	cliente_id integer
	valor integer
	created_at datetime
	updated_at datetime
}