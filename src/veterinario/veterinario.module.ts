import { Module } from '@nestjs/common';
import { VeterinarioService } from './veterinario.service';
import { VeterinarioController } from './veterinario.controller';
import { Veterinario } from './entities/veterinario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Veterinario])],
  controllers: [VeterinarioController],
  providers: [VeterinarioService],
})
export class VeterinarioModule {}
