// user.entity.ts


// one to one relationships

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @OneToOne(() => Profile)
//   @JoinColumn() // owning side
//   profile: Profile;
// }


//one to many

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @OneToMany(() => Post, post => post.user)
//   posts: Post[];
// }




//many to many

// @Entity()
// export class Student {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToMany(() => Course)
//   @JoinTable()
//   courses: Course[];
// }




