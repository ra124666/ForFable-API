import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { ResponseContract } from '@ioc:Adonis/Core/Response'
import { UserValidator } from 'App/Validators/UserValidator'
import { SessionContract } from '@ioc:Adonis/Addons/Session'
import { PasswordInsert, UsersController } from '@ioc:forfabledomain'
import UsersProvider from '@ioc:Providers/UsersService'
import AdonisExceptionHandler from 'App/Exceptions/Handler'
import { UsesUsecase } from './_Conversor'
import { UserUpdateValidator } from 'App/Validators/UserUpdateValidator'


const langContract = AdonisExceptionHandler.contract

export default class UsersAdonisController implements UsesUsecase<UsersController> {
  public async index(ctx: HttpContextContract): Promise<any> {
    const { page, limit } = ctx.request.qs()
    const instance = AdonisExceptionHandler.getInstance(ctx.response)
    const badRequest = instance.BadRequest.bind(instance)
    if((!page && limit || page && !limit)) {
      return badRequest()
    }
    if(page && limit) {
      if(Number.isNaN(Number(page)) || Number.isNaN(Number(limit))) {
        return badRequest()
      }
      if(Number(page) < 1 || Number(limit) < 1) {
        return badRequest()
      }
    }

    return UsersProvider(ctx).index(page, limit)
  }

  public async show(ctx: HttpContextContract): Promise<any> {
    return UsersProvider(ctx).show(ctx.params.id)
  }

  public async storeUser(ctx: HttpContextContract, isAdmin: boolean = false): Promise<any> {
    const body = await new UserValidator(ctx).validate()
    return UsersProvider(ctx).store(body, isAdmin)
  }

  public async storeAdmin(ctx: HttpContextContract): Promise<any> {
    return await this.storeUser(ctx, true)
  }

  public async update(ctx: HttpContextContract): Promise<any> {
    const { params, auth } = ctx
    const responserId = auth?.user?.id
    const body = await new UserUpdateValidator(ctx).validateAsOptional()
    return UsersProvider(ctx).update(responserId, params.id, body)
  }

  public async destroy(ctx: HttpContextContract): Promise<any> {
    const responserId = ctx.auth?.user?.id
    return UsersProvider(ctx).destroy(responserId, ctx.params.id)
  }

  public async verifyEmail(ctx: HttpContextContract): Promise<any> {
    await UsersProvider(ctx).verifyEmail(ctx.request.param('token'))
  }

  public async requestPasswordChange(ctx: HttpContextContract): Promise<any> {
    await UsersProvider(ctx).requestPasswordChange(ctx.auth.user)
  }

  public async restartPasswordView({ request, view }: HttpContextContract): Promise<string> {
    const token = request.param('token')
    return await view.render('password-reset', { token: token })
  }

  public async restartPassword(ctx: HttpContextContract): Promise<any | string> {
    const { request, response, session, view } = ctx
    const token = request.param('token')
    
    const { error } = await UsersProvider(ctx).restartPassword(
      langContract, token, request.body() as PasswordInsert
    )
    if (error) {
      return redirectToPasswordChange(session, response, token, error as string)
    } else {
      return await view.render('password-reset-sucess')
    }
  }
}

const redirectToPasswordChange = async (
  session: SessionContract,
  response: ResponseContract,
  token: string,
  errorMessage: string
) => {
  session.flash('error', errorMessage)
  response.redirect(`/restart-password/${token}`)
}
