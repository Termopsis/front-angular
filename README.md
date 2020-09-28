Записная книжка - TODO

#1 
Проект построен на Angular CLI 8.3.3

#2
2.1 В приложении сделано CRUD для категорий, задач и приоритетов.
2.2 Возможно искать определенную категорию по её названию - Левая часть окна.
2.3 Возможно искать задачи по названию, статусу, приоритету.(Кнопка "Показать поиск") - по умолчанию скрыто. - При изменении настроек нужно нажать на поиск.

#3
Так же представлена статистика по завершенным задачам(Кнопка "Показать статистику"). - по умолчанию скрыто.

#4
Данное приложение берет данные с backend https://github.com/Termopsis/backend-springboot
Для полноценной работы нужно скачать и запустить его.

#5
БД MySQL

Base name "tasklist"
Текст запроса на минимальную бд:

CREATE TABLE `category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `completed_count` bigint(20) DEFAULT '0',
  `uncompleted_count` bigint(20) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_title` (`title`))

CREATE TABLE `priority` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_title` (`title`)
)

CREATE TABLE `stat` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `completed_total` bigint(20) DEFAULT '0',
  `uncompleted_total` bigint(20) DEFAULT '0',
  PRIMARY KEY (`id`)
) 

CREATE TABLE `task` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `completed` int(11) DEFAULT '0',
  `date` datetime DEFAULT NULL,
  `priority_id` bigint(20) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category_idx` (`category_id`),
  KEY `fk_priority_idx` (`priority_id`),
  KEY `index_title` (`title`),
  KEY `index_completed` (`completed`),
  KEY `index_date` (`date`),
  CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `fk_priority` FOREIGN KEY (`priority_id`) REFERENCES `priority` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
)
