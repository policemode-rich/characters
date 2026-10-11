-- local config = require 'config.shared'


local function toggleNuiFrame(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
end

RegisterCommand('show-nui', function()
    toggleNuiFrame(true)
    SendReactMessage('showUi', true)
    debugPrint('Show NUI frame')
end)

RegisterNUICallback('hideFrame', function(_, cb)
    toggleNuiFrame(false)
    debugPrint('Hide NUI frame')
    cb({})
end)



local cinematic = false
local cam = nil

function Loadvehicle(name)
    local hash = GetHashKey(name)

    RequestModel(hash)

    while not HasModelLoaded(hash) do
        Wait(0)
    end

    print(hash)
    return hash
end

RegisterCommand('joinServer', function()
    if cinematic then
        StopCinematic()
        return
    end
    SetNuiFocus(true , true )
    Citizen.CreateThread(function()
        local ped = PlayerPedId()
        local handle = RegisterPedheadshot(ped)

        while not IsPedheadshotReady(handle) or not IsPedheadshotValid(handle) do
            Citizen.Wait(0)
        end

        local txd = GetPedheadshotTxdString(handle)
        Wait(3200)
        SendReactMessage('showUi', {
            Face=txd ,
        })
    end)



    cinematic = true
    TriggerEvent("esx_hud:HudToggle", false)
    DisplayRadar(false) 

    local ped = PlayerPedId()
    SetEntityCoords(ped,189.0625, -237.9426, 65.7375, false, false, false, true)   
    SetEntityHeading(ped, 161.5407)
    Citizen.Wait(500)
    local vehicleHash = Loadvehicle('adder')
    local CoordsVehicle = GetOffsetFromEntityInWorldCoords(ped, 0.0, -2.5, 0.0)

    local vehicle = CreateVehicle(vehicleHash, CoordsVehicle.x, CoordsVehicle.y, CoordsVehicle.z, 161.5407, true, true)

    FreezeEntityPosition(vehicle, true)


    RequestAnimDict('amb@world_human_leaning@male@wall@back@foot_up@idle_a')

    while not HasAnimDictLoaded('amb@world_human_leaning@male@wall@back@foot_up@idle_a') do
        Wait(0)
    end

    TaskPlayAnim(
        ped,
        'amb@world_human_leaning@male@wall@back@foot_up@idle_a',
        'idle_a',
        8.0,
        -8.0,
        -1,
        1,
        0.0,
        false,
        false,
        false
    )

    local cam1 = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)

    local camCoords = GetOffsetFromEntityInWorldCoords(ped, 2.0, -6.0, 1.0)
    local c1 = vector3(camCoords.x - 2, camCoords.y - 1, camCoords.z - 1.0)

    SetCamCoord(cam1, c1.x, c1.y, c1.z)
    SetCamFov(cam1, 35.0)

    local target     = GetEntityCoords(ped)
    local dx, dy, dz = target.x - c1.x, target.y - c1.y, target.z - c1.z
    local yaw        = -math.deg(math.atan2(dx, dy))
    local pitch      = math.deg(math.atan2(dz, math.sqrt(dx * dx + dy * dy)))

    SetCamRot(cam1, pitch, 45.0, yaw, 2)
    local cam2 = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)

    local playerCamCoords = GetOffsetFromEntityInWorldCoords(ped, 3.0, -2.5, 1.0)
    SetCamCoord(cam2, playerCamCoords.x + 1, playerCamCoords.y, playerCamCoords.z - 1)
    PointCamAtEntity(cam2, ped, 1.0, 0.0, 0.5, true)
    SetCamFov(cam2, 35.0)
    SetCamActive(cam1, true)
    RenderScriptCams(true, false, 0, true, true)
    Wait(1000)
    SetCamActiveWithInterp(cam2, cam1, 3000, 1, 1)
    Wait(3000)
    DestroyCam(cam1, false)
    cam = cam2
end, false)





function StopCinematic()
    cinematic = false
    local ped = PlayerPedId()
    ClearPedTasks(ped)
    DisplayRadar(true)
    TriggerEvent("esx_hud:HudToggle", true)

    if cam and DoesCamExist(cam) then
        RenderScriptCams(false, true, 1500, true, true)
        DestroyCam(cam, false)
        cam = nil
    end
end
