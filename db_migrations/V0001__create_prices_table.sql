CREATE TABLE t_p94847070_mini_sait_massazhist.prices (
  id SERIAL PRIMARY KEY,
  group_name TEXT NOT NULL,
  time_label TEXT NOT NULL,
  price TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

INSERT INTO t_p94847070_mini_sait_massazhist.prices (group_name, time_label, price, sort_order) VALUES
  ('Расслабляющий массаж', '30 мин', '25 руб.', 1),
  ('Расслабляющий массаж', '60 мин', '50 руб.', 2),
  ('Расслабляющий массаж', '90 мин', '70 руб.', 3),
  ('Антицеллюлитный', '60 мин', '60 руб.', 4),
  ('Антицеллюлитный', '60 мин + обёртывание', '110 руб.', 5),
  ('Баночный массаж', '60 мин', '50 руб.', 6),
  ('Массаж лица', '15 мин', '20 руб.', 7);
