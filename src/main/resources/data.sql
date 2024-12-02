USE db_socialcommerce;

INSERT INTO category (category_id, category_name) VALUES
                                                      (1, 'Temporada'),
                                                      (2, 'Televisores'),
                                                      (3, 'Smartphones'),
                                                      (4, 'Jogos'),
                                                      (5, 'Eletrônicos'),
                                                      (6, 'Decorações'),
                                                      (7, 'Roupas')

ON DUPLICATE KEY UPDATE category_name = VALUES(category_name);

