import { Knex } from 'knex';
import { TeamModel } from '../models/TeamModel.js';
import { TournamentModel } from '../models/TournamentModel.js';
import { GroupModel } from '../models/GroupModel.js';
import { MatchModel } from '../models/MatchModel.js';
import { BaseModel } from '../models/BaseModel.js';
import { UserModel } from '../models/UserModel.js';
import { TransactionModel } from '../models/TransactionModel.js';

export async function seed(knex: Knex): Promise<void> {
  BaseModel.knex(knex);

  try {
    console.log('⚽ CREATING TEAMS');
    const teamsData = [
      ['Baile de Monique', 'BDM'],
      ['Bar Sem Lona', 'BSL'],
      ['Barracelona', 'BAR'],
      ['Inter de Limão', 'IDL'],
      ['Inter de Meião', 'IMI'],
      ['Inter de Melão', 'IML'],
      ['Tabajara Futebol Clube', 'TFC'],
      ['Íbis Sport Club', 'ISC'],
    ].map(([name, shortName]) => ({ name, shortName }));
    const teams = await TeamModel.query().insert(teamsData);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 2);
    startDate.setHours(0, 0, 0, 0);

    console.log('🏆 CREATING TOURNAMENT');
    const tournament = await TournamentModel.query().insert({
      name: `Copa do Limoeiro ${startDate.getFullYear()}`,
      startsAt: startDate.toISOString(),
      endsAt: new Date(startDate.getTime() + 2 * 7 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks
    });

    console.log('🌐 CREATING GROUPS');
    const groups = await Promise.all(
      teams
        .reduce(
          (acc, team) => {
            if (acc[acc.length - 1].length === 4) {
              acc.push([]);
            }
            acc[acc.length - 1].push(team);
            return acc;
          },
          [[]] as TeamModel[][],
        )
        .map(async (teamsFromGroup, index) => {
          const groupName = String.fromCharCode('A'.charCodeAt(0) + index);

          const group = await GroupModel.query().insertGraphAndFetch(
            {
              name: `Group ${groupName}`,
              tournamentId: tournament.id,
              teams: teamsFromGroup,
            },
            { relate: true },
          );

          return group;
        }),
    );

    const locations = ['Campinho do Limoeiro', 'Campinho da Rua de Baixo'];

    console.log('🆚 CREATING MATCHES');
    await Promise.all(
      groups
        .flatMap((group) =>
          group.teams.flatMap((teamA) => group.teams.filter((teamB) => teamA !== teamB).map((teamB) => [teamA, teamB])),
        )
        .map(async ([teamA, teamB], matchNumber) => {
          const matchTime = new Date(startDate);
          matchTime.setDate(matchTime.getDate() + Math.floor(matchNumber / 2));
          matchTime.setHours(matchNumber % 2 === 0 ? 16 : 19, 0, 0, 0);

          return MatchModel.query().insert({
            startsAt: matchTime.toISOString(),
            location: locations[Math.floor(Math.random() * locations.length)],
            phase: 'group',
            status: matchTime < new Date() ? 'finished' : 'scheduled',
            tournamentId: tournament.id,
            teamAId: teamA.id,
            teamAScore: 0,
            teamBId: teamB.id,
            teamBScore: 0,
          });
        }),
    );

    console.log('🤵 CREATING USERS');
    const usersData = [
      ['bidu', 'admin'],
      ['cascao', 'basic'],
      ['cebolinha', 'basic'],
      ['chico.bento', 'basic'],
      ['dorinha', 'basic'],
      ['franjinha', 'basic'],
      ['jeremias', 'basic'],
      ['monica', 'basic'],
      ['sansao', 'admin'],
    ];

    await Promise.all(
      usersData.map(async ([username, role]) => {
        const user = await UserModel.query().insert({
          email: `${username}@mail.com`,
          encryptedPassword: 'sekr3t',
          role,
        });

        if (role === 'basic') {
          await TransactionModel.query().insert({
            amount: Math.floor(Math.random() * 5001) + 5000,
            kind: 'credit',
            userId: user.id,
          });
        }

        return user;
      }),
    );

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  } finally {
    await knex.destroy();
  }
}
