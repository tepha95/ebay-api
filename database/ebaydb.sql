
CREATE TABLE public.roles (
                id_roles INTEGER NOT NULL,
                name VARCHAR(20) NOT NULL,
                CONSTRAINT roles_pk PRIMARY KEY (id_roles)
);


CREATE TABLE public.users (
                id_users INTEGER NOT NULL,
                id_roles INTEGER NOT NULL,
                name VARCHAR(20) NOT NULL,
                lastname VARCHAR(20) NOT NULL,
                username VARCHAR(100) NOT NULL,
                phone VARCHAR(100) NOT NULL,
                password VARCHAR(200) NOT NULL,
                CONSTRAINT users_pk PRIMARY KEY (id_users)
);


CREATE SEQUENCE public.posts_posts_id_seq_1;

CREATE TABLE public.posts (
                posts_id INTEGER NOT NULL DEFAULT nextval('public.posts_posts_id_seq_1'),
                id_users INTEGER NOT NULL,
                posts_title VARCHAR(100) NOT NULL,
                posts_description VARCHAR(500) NOT NULL,
                posts_price DOUBLE PRECISION NOT NULL,
                posts_created_at TIMESTAMP NOT NULL,
                posts_quantity INTEGER NOT NULL,
                posts_image VARCHAR(1000) NOT NULL,
                CONSTRAINT posts_pk PRIMARY KEY (posts_id)
);


ALTER SEQUENCE public.posts_posts_id_seq_1 OWNED BY public.posts.posts_id;

CREATE SEQUENCE public.comments_comments_id_seq;

CREATE TABLE public.comments (
                comments_id INTEGER NOT NULL DEFAULT nextval('public.comments_comments_id_seq'),
                posts_id INTEGER NOT NULL,
                id_users INTEGER NOT NULL,
                comments_descripcion VARCHAR(200) NOT NULL,
                comments_created_at TIMESTAMP NOT NULL,
                comments_main BOOLEAN NOT NULL,
                comments_refer_id varchar(100),
                CONSTRAINT comments_pk PRIMARY KEY (comments_id)
);


ALTER SEQUENCE public.comments_comments_id_seq OWNED BY public.comments.comments_id;

ALTER TABLE public.users ADD CONSTRAINT roles_users_fk
FOREIGN KEY (id_roles)
REFERENCES public.roles (id_roles)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.posts ADD CONSTRAINT users_posts_fk
FOREIGN KEY (id_users)
REFERENCES public.users (id_users)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.comments ADD CONSTRAINT users_comments_fk
FOREIGN KEY (id_users)
REFERENCES public.users (id_users)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.comments ADD CONSTRAINT posts_comments_fk
FOREIGN KEY (posts_id)
REFERENCES public.posts (posts_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

INSERT INTO roles VALUES(1, 'USERS');
INSERT INTO roles VALUES(2, 'ADMIN');